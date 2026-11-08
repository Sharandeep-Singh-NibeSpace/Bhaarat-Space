#!/usr/bin/env python3
"""Insert the Bharat Space include into the nginx server block that listens
on port 80. Existing location blocks are left as they are.

  insert_nginx_include.py --find
      Print the config file that should be edited.

  insert_nginx_include.py /path/to/file.conf
      Insert the include into that file.
"""
import re
import subprocess
import sys
from pathlib import Path

INCLUDE = "include /etc/nginx/snippets/bharat-space.conf;"
MARKERS = (
    "location /data-analysis/",
    "location /image-analysis/",
    "proxy_pass http://127.0.0.1:3000",
)
LISTEN_80 = re.compile(
    r"listen\s+(?:\[::\]:|0\.0\.0\.0:|\*:)?80(?!\d)"
)


def closing_brace(text, open_index):
    depth = 0
    for i in range(open_index, len(text)):
        char = text[i]
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return i
    raise SystemExit("nginx config has unbalanced braces; not modified")


def server_blocks(text):
    blocks = []
    for match in re.finditer(r"\bserver\b", text):
        brace = text.find("{", match.start())
        if brace < 0:
            continue
        between = text[match.end():brace]
        if between.strip() != "":
            continue
        end = closing_brace(text, brace)
        blocks.append((brace, end, text[match.start():end + 1]))
    return blocks


def port80_server_close(text):
    found = []
    for brace, end, block in server_blocks(text):
        if LISTEN_80.search(block):
            found.append((block.count("location"), end, block))
    if not found:
        return None
    found.sort(key=lambda item: item[0], reverse=True)
    return found[0][1]


def server_close_index(text, marker_at):
    depth = 0
    i = marker_at
    while i >= 0:
        char = text[i]
        if char == "}":
            depth += 1
        elif char == "{":
            if depth == 0:
                prefix = text[:i].rstrip()
                match = re.search(r"([A-Za-z_]+)\s*$", prefix)
                if match and match.group(1) == "server":
                    return closing_brace(text, i)
            else:
                depth -= 1
        i -= 1
    raise SystemExit(
        "Could not find the server { } block that contains the existing apps"
    )


def config_files():
    found = []
    seen = set()

    def add(path):
        if not path or "bharat-space.conf" in path:
            return
        file_path = Path(path)
        if not file_path.is_file():
            return
        real = str(file_path.resolve())
        if real in seen:
            return
        seen.add(real)
        found.append(file_path)

    try:
        listed = subprocess.run(
            ["nginx", "-T"],
            capture_output=True,
            text=True,
            check=False,
        )
    except FileNotFoundError:
        listed = None
    if listed is not None:
        blob = (listed.stdout or "") + "\n" + (listed.stderr or "")
        for match in re.finditer(
            r"^# configuration file (.+):$", blob, re.M
        ):
            add(match.group(1).strip())

    roots = [Path("/etc/nginx"), Path("/usr/local/nginx/conf"), Path("/usr/local/etc/nginx")]
    for root in roots:
        if not root.is_dir():
            continue
        for file_path in root.rglob("*"):
            if file_path.is_file() and (
                file_path.suffix == ".conf" or file_path.name == "default"
            ):
                add(str(file_path))
    return found


def choose_file(paths):
    marked = []
    port80 = []
    for path in paths:
        text = path.read_text(encoding="utf-8", errors="replace")
        if "bharat-space.conf" in text:
            return path
        if any(marker in text for marker in MARKERS):
            marked.append(path)
        if port80_server_close(text) is not None:
            port80.append(path)
    if len(marked) == 1:
        return marked[0]
    if len(marked) > 1:
        raise SystemExit(
            "More than one nginx file contains the existing sites:\n"
            + "\n".join(f"  {path}" for path in marked)
        )
    if len(port80) == 1:
        return port80[0]
    if len(port80) > 1:
        raise SystemExit(
            "More than one nginx file listens on port 80:\n"
            + "\n".join(f"  {path}" for path in port80)
            + "\nRe-run with NGINX_FILE=/path/to/the/right/file"
        )
    raise SystemExit(
        "Could not find a nginx server block that listens on port 80."
    )


def insert_include(path):
    text = path.read_text(encoding="utf-8")
    if "bharat-space.conf" in text:
        print("include already present")
        return
    if (
        "location /Bharat" in text
        or "location = /Bharat" in text
        or "location ^~ /Bharat" in text
    ):
        raise SystemExit(
            "A /Bharat location is already in this file. "
            "Refusing to add a second one."
        )
    marker_at = -1
    for marker in MARKERS:
        marker_at = text.find(marker)
        if marker_at >= 0:
            break
    if marker_at >= 0:
        close_at = server_close_index(text, marker_at)
    else:
        close_at = port80_server_close(text)
        if close_at is None:
            raise SystemExit(
                "Could not find the existing server block "
                "(no data-analysis, image-analysis, port 3000, or listen 80)."
            )
    updated = text[:close_at] + "\n    " + INCLUDE + "\n" + text[close_at:]
    path.write_text(updated, encoding="utf-8")
    print(f"Inserted include into {path}")


def main():
    if len(sys.argv) == 2 and sys.argv[1] == "--find":
        print(choose_file(config_files()))
        return
    if len(sys.argv) != 2:
        raise SystemExit(
            "usage: insert_nginx_include.py /path/to/nginx.conf\n"
            "       insert_nginx_include.py --find"
        )
    insert_include(Path(sys.argv[1]))


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Add the Bharat Space include to the one nginx server that answers the public IP.

Other server blocks and other files are not modified.

  insert_nginx_include.py --find
      Print the config file that should be edited.

  insert_nginx_include.py /path/to/file.conf
      Insert the include into the chosen server block of that file.
"""
import os
import re
import subprocess
import sys
from pathlib import Path

INCLUDE = "include /etc/nginx/snippets/bharat-space.conf;"
PUBLIC_IP = os.environ.get("BHARAT_PUBLIC_IP", "200.97.168.12")
MARKERS = (
    "location /data-analysis/",
    "location /image-analysis/",
    "proxy_pass http://127.0.0.1:3000",
)
LISTEN_80 = re.compile(
    r"listen\s+(?:\[::\]:|0\.0\.0\.0:|\*:)?80(?!\d)"
)
CATCHALL_NAMES = {"_", PUBLIC_IP, "localhost", "127.0.0.1"}


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


def server_names(block):
    names = []
    for match in re.finditer(r"server_name\s+([^;]*);", block):
        names.extend(match.group(1).split())
    return names


def score_server(block, order):
    """Higher score is the server that receives http://PUBLIC_IP/."""
    if not LISTEN_80.search(block):
        return None
    score = 0.0
    reasons = []
    if re.search(r"\bdefault_server\b", block):
        score += 100
        reasons.append("default_server")
    names = server_names(block)
    if PUBLIC_IP in names:
        score += 80
        reasons.append("server_name is the public IP")
    if not names or "_" in names:
        score += 40
        reasons.append("catch-all server_name")
    domains = [
        name for name in names
        if name not in CATCHALL_NAMES and not re.fullmatch(r"\d+\.\d+\.\d+\.\d+", name)
    ]
    if domains and not re.search(r"\bdefault_server\b", block) and PUBLIC_IP not in names:
        score -= 50
        reasons.append("named site " + domains[0])
    for marker in MARKERS:
        if marker in block:
            score += 25
            reasons.append("existing shared apps")
            break
    # nginx uses the first server as the implicit default when none is marked.
    score -= order * 0.01
    if not reasons:
        reasons.append("first port-80 server")
    return score, ", ".join(reasons)


def best_server(text):
    best = None
    order = 0
    for _brace, end, block in server_blocks(text):
        scored = score_server(block, order)
        if scored is None:
            continue
        score, reason = scored
        if best is None or score > best[0]:
            best = (score, end, reason)
        order += 1
    return best


def loaded_paths():
    try:
        listed = subprocess.run(
            ["nginx", "-T"],
            capture_output=True,
            text=True,
            check=False,
        )
    except FileNotFoundError as exc:
        raise SystemExit("nginx is not installed; no site was changed.") from exc
    dump = listed.stdout or ""
    paths = []
    seen = set()
    for match in re.finditer(r"^# configuration file (.+):\s*$", dump, re.M):
        raw = match.group(1).strip()
        if "bharat-space.conf" in raw:
            continue
        file_path = Path(raw)
        if not file_path.is_file():
            continue
        real = file_path.resolve()
        if real in seen:
            continue
        seen.add(real)
        paths.append(real)
    if not paths:
        raise SystemExit(
            "nginx -T did not list a config file. No site was changed."
        )
    return paths


def choose_from_paths(paths):
    best = None
    order = 0
    for path in paths:
        text = Path(path).read_text(encoding="utf-8", errors="replace")
        for _brace, _end, block in server_blocks(text):
            scored = score_server(block, order)
            if scored is None:
                continue
            score, reason = scored
            if best is None or score > best[0]:
                best = (score, Path(path).resolve(), reason)
            order += 1
    if best is None:
        raise SystemExit(
            "Could not find a nginx server block that listens on port 80. "
            "No site was changed."
        )
    return best[1], best[2]


def insert_include(path):
    path = Path(path)
    text = path.read_text(encoding="utf-8")
    if INCLUDE in text:
        print(f"include already present in {path}", file=sys.stderr)
        return
    if (
        "location /Bharat" in text
        or "location = /Bharat" in text
        or "location ^~ /Bharat" in text
    ):
        raise SystemExit(
            "A /Bharat location is already in this file. "
            "Refusing to add a second one. No site was changed."
        )
    chosen = best_server(text)
    if chosen is None:
        raise SystemExit(
            "Could not find a port-80 server block in "
            f"{path}. No site was changed."
        )
    _score, close_at, reason = chosen
    needle = "\n    " + INCLUDE + "\n"
    updated = text[:close_at] + needle + text[close_at:]
    if updated.replace(needle, "", 1) != text:
        raise SystemExit(
            "Refusing to write nginx config because the edit would change "
            "more than the Bharat include. No site was changed."
        )
    path.write_text(updated, encoding="utf-8")
    print(f"Inserted include into {path} ({reason})", file=sys.stderr)


def main():
    if len(sys.argv) == 2 and sys.argv[1] == "--find":
        path, reason = choose_from_paths(loaded_paths())
        print(f"Chose {path} ({reason}). Other nginx files are not edited.", file=sys.stderr)
        print(path)
        return
    if len(sys.argv) != 2:
        raise SystemExit(
            "usage: insert_nginx_include.py /path/to/nginx.conf\n"
            "       insert_nginx_include.py --find"
        )
    insert_include(Path(sys.argv[1]))


if __name__ == "__main__":
    main()

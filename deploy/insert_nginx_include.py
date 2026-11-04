#!/usr/bin/env python3
"""Insert the Bharat Space include into the nginx server block that already
serves the other apps. Existing location blocks are left as they are.
"""
import re
import sys
from pathlib import Path

INCLUDE = "include /etc/nginx/snippets/bharat-space.conf;"
MARKERS = (
    "location /data-analysis/",
    "location /image-analysis/",
    "proxy_pass http://127.0.0.1:3000",
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


def main():
    if len(sys.argv) != 2:
        raise SystemExit("usage: insert_nginx_include.py /path/to/nginx.conf")
    path = Path(sys.argv[1])
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
    if marker_at < 0:
        raise SystemExit(
            "Could not find the existing server block "
            "(looked for data-analysis, image-analysis, and port 3000)."
        )
    close_at = server_close_index(text, marker_at)
    updated = text[:close_at] + "\n    " + INCLUDE + "\n" + text[close_at:]
    path.write_text(updated, encoding="utf-8")
    print(f"Inserted include into {path}")


if __name__ == "__main__":
    main()

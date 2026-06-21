#!/usr/bin/env python3
"""
Helyi fejlesztői szerver, amely ugyanúgy viselkedik, mint a GitHub Pages:
a /homlokzati kérésre a homlokzati.html fájlt szolgálja ki ("szép" URL-ek).
Csak fejlesztéshez kell – éles üzemben a GitHub Pages intézi ezt.

Indítás:  python3 dev-server.py
Megnyitás: http://localhost:8000
Leállítás: Ctrl+C
"""
import http.server
import os
import socketserver

PORT = 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        local = super().translate_path(path)
        # Ha nincs ilyen fájl/mappa, de létezik .html párja, azt adjuk.
        if not os.path.exists(local) and not path.endswith("/"):
            if os.path.isfile(local + ".html"):
                return local + ".html"
        return local


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"SG Állvány előnézet: http://localhost:{PORT}")
        print("Leállítás: Ctrl+C")
        httpd.serve_forever()

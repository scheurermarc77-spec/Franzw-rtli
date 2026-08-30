FRANÇAIS KARTEN – VERSION 13

Neu:
- Sichere DeepL-Anbindung über einen Cloudflare Worker.
- DeepL-Schlüssel wird NICHT in GitHub Pages oder im Browser gespeichert.
- Unter "Verwalten" kann die Worker-Adresse einmal hinterlegt und getestet werden.
- Sobald der Worker eingerichtet ist, verwendet die Einzelübersetzung und der Fotoimport DeepL.
- Solange noch kein Worker eingetragen ist, funktioniert die bisherige Übersetzung als Fallback weiter.

Enthalten:
- komplette GitHub-Pages-App
- cloudflare-worker/
- DEEPL_EINRICHTUNG.md

Wichtig: Den Ordner cloudflare-worker musst du nicht in dieselbe GitHub-Pages-Auslieferung legen. Er ist der Quellcode für den separaten geschützten Übersetzungsserver.

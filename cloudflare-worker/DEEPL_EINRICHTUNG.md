# DeepL sicher einrichten – Version 13

Die App selbst bleibt auf GitHub Pages. Der DeepL-Schlüssel gehört **nicht** in `index.html`.

## 1. DeepL API-Zugang
Erstelle bei DeepL einen API-Zugang und kopiere deinen API-Schlüssel.

## 2. Cloudflare Worker erstellen
Du kannst den Ordner `cloudflare-worker` verwenden.

Mit Wrangler:
1. Node.js installieren, falls noch nicht vorhanden.
2. Im Ordner `cloudflare-worker` ausführen: `npm install`
3. Bei Cloudflare anmelden: `npx wrangler login`
4. In `wrangler.jsonc` bei `ALLOWED_ORIGIN` deine GitHub-Pages-Domain eintragen.
5. DeepL-Schlüssel als Secret speichern: `npx wrangler secret put DEEPL_API_KEY`
6. Worker veröffentlichen: `npm run deploy`

Cloudflare zeigt danach eine Adresse ähnlich wie
`https://francais-karten-deepl.DEINNAME.workers.dev`.

## 3. Adresse in der Karteikarten-App hinterlegen
1. Neue Version der App auf GitHub Pages hochladen.
2. App öffnen → **Verwalten**.
3. Unter **Bessere Übersetzung mit DeepL** die Worker-Adresse eintragen.
4. **Server speichern**.
5. **Verbindung testen**.
6. Wenn `✅ Verbindung funktioniert. DeepL ist bereit.` erscheint, werden neue Übersetzungen über DeepL geholt.

## Sicherheit
Der DeepL-API-Schlüssel wird nur als Cloudflare-Secret gespeichert. Er befindet sich nicht im öffentlichen GitHub-Repository und nicht im Browser-Code der App.

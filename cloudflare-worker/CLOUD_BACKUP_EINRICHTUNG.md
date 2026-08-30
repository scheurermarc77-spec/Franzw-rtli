# Cloud-Sicherung – einmalige Cloudflare-Einrichtung

Für Version 15 muss einmal eine Cloudflare-D1-Datenbank mit dem bestehenden Worker verbunden werden.

1. Cloudflare Dashboard → D1 SQL Database erstellen.
   Name: francais-karten-backups

2. In der D1-Konsole den Inhalt von `cloudflare-worker/schema.sql` ausführen.

3. Beim bestehenden Worker `francais-karten-deepl`:
   Settings / Bindings → Add binding → D1 Database

   Variable name: BACKUPS
   Database: francais-karten-backups

4. Den Inhalt von `cloudflare-worker/src/index.js` in den Worker-Code kopieren und Deploy drücken.

5. Der bereits gespeicherte Secret `DEEPL_API_KEY` bleibt unverändert.

Danach kann Version 15 auf GitHub Pages hochgeladen werden.

In der App:
Verwalten → Automatische Cloud-Sicherung → Persönliche Cloud-Sicherung erstellen.

Jede Person erhält einen eigenen zufälligen Wiederherstellungscode.

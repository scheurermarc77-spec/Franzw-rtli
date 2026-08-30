CREATE TABLE IF NOT EXISTS backups (
  recovery_code TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_backups_updated_at ON backups(updated_at);

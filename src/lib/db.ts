import sqlite from "better-sqlite3";

export const db = sqlite(":memory:");

db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS Comment (
  id INTEGER PRIMARY KEY,
  text TEXT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
)`);

export interface DatabaseUser {
  id: string;
  username: string;
  password_hash: string;
}

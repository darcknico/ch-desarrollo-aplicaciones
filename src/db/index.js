import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync("chmarket.db");

export const createSessionsTable = async () => {
  const access = await db;
  await access.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL)
    `);
};

export const insertSession = async ({ email, localId, token }) => {
  const access = await db;
  const result = await access.runAsync('INSERT INTO sessions (email, localId, token) VALUES (?,?,?)',email, localId, token);

};

export const fetchSession = async () => {
  const access = await db;
  const result = await access.getAllAsync('SELECT * FROM sessions');
  return result;
};

export const clearSessions = async () => {
  const access = await db;
  const result = await access.runAsync('DELETE FROM sessions');
};
import { sql } from '@vercel/postgres';

export async function initDb() {
  await sql`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    uuid TEXT NOT NULL UNIQUE,
    quota BIGINT DEFAULT 0,
    expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  )`;
}

export async function getUsers() {
  const { rows } = await sql`SELECT * FROM users ORDER BY id DESC`;
  return rows;
}

export async function addUser(name: string, uuid: string, quota: number, expiry: string | null) {
  const { rows } = await sql`
    INSERT INTO users (name, uuid, quota, expiry)
    VALUES (${name}, ${uuid}, ${quota}, ${expiry})
    RETURNING *
  `;
  return rows[0];
}

export async function deleteUser(id: number) {
  await sql`DELETE FROM users WHERE id = ${id}`;
}
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(req, res) {
  const id = req.url.slice(req.url.lastIndexOf('/') + 1);
  console.log(`id is ${id}`);
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  try {
    const items = await db.get(`SELECT * FROM user WHERE id = ${id}`);
    return Response.json(items);
  } catch (err) {
    console.error(`Error finding user ${id}`);
    return Response.json({ error: `Error finding user ${id}`})
  }

}
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

//Get all comments
export async function GET() {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  const items = await db.all("SELECT * FROM comment");

  return Response.json(items);
}

export async function POST(req) {
  const { description, user_id, post_id } = await req.json();
  if (!db) {
    db = await open ({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  
  try {
    const insertSql = `INSERT INTO comment(description, post_id, user_id) VALUES("${description}", "${post_id}", "${user_id}")`;
    db.run(insertSql);
    return Response.json({ message: "comment added successfully" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error adding comment" });
  }
}
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

//Get all posts
export async function GET() {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  const items = await db.all("SELECT * FROM post");

  return Response.json(items);
}

export async function POST(req) {
  const { title, description, user_id } = await req.json();
  if (!db) {
    db = await open ({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  
  try {
    const insertSql = `INSERT INTO post(title, description, user_id) VALUES("${title}", "${description}", "${user_id}")`;
    db.run(insertSql);
    return Response.json({ message: "Post added successfully" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error adding post" });
  }
}
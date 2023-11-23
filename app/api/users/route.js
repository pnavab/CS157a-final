import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { cookies } from 'next/headers'

let db = null;

//Get all users
export async function GET() {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }
  const items = await db.all("SELECT * FROM user");

  return Response.json(items);
}

export async function POST(req) {
  const { username, password, fullname } = await req.json();
  if (!db) {
    db = await open ({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }

  if (typeof fullname === 'undefined') {
    try {
      const items = await db.get(`SELECT username, password, id FROM user WHERE username = "${username}" AND password = "${password}"`);
      if (typeof items !== "undefined") {
        const oneDay = 24 * 60 * 60 * 1000
        cookies().set("username", username, {secure: true , expires: Date.now() - oneDay })
        cookies().set("userID", username, {secure: true , expires: Date.now() - oneDay })
        console.log(cookies().getAll())
        return Response.json({ message: "Login Successful" });
      } else {
        return Response.json({ message: "Login Unsuccessful" }, { status: 400 });
      }
    } catch (err) {
      console.error(err);
      return Response.json({ error: err.message || "Internal Server Error" }, { status: 500 });
    }
  }
  try {
    const insertSql = `INSERT INTO user(username, fullname, password) VALUES("${username}", "${fullname}", "${password}")`;
    const p = await db.run(insertSql);
    
    return Response.json({ error: {errno : 0} });
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ error: err }))
  }
}
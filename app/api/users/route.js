import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
const crypto = require("crypto");

let db = null;

function generateSessionToken() {
  const tokenLength = 32;
  return crypto.randomBytes(tokenLength).toString('hex');
}

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
      const items = await db.get(`SELECT username, password FROM user WHERE username = "${username}" AND password = "${password}"`);
      if (typeof items !== "undefined") {
        console.log(items);
        console.log("HERE");
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
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { cookies } from 'next/headers';

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
  const { username, password, fullname, logout } = await req.json();
  if (!db) {
    db = await open ({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }

  // logout request
  if (typeof logout != 'undefined') {
    cookies().delete('userID');
    cookies().delete('role');
    return Response.json({ message: "Logged out" });
  }

  // login request
  if (typeof fullname === 'undefined') {
    try {
      const items = await db.get(`SELECT username, password, id, role FROM user WHERE username = "${username}" AND password = "${password}"`);
      if (typeof items !== "undefined") {
        const oneDay = 24 * 60 * 60 * 1000;
        cookies().set("userID", items.id, {secure: true , expires: Date.now() + oneDay });
        cookies().set("role", items.role, {secure: true , expires: Date.now() + oneDay });
        return Response.json({ message: "Login Successful" });
      } else {
        return Response.json({ message: "Login credentials do not match" }, { status: 400 });
      }
    } catch (err) {
      console.error(err);
      return Response.json({ error: err.message || "Internal Server Error" }, { status: 500 });
    }
  }
  try {
    const insertSql = `INSERT INTO user(username, fullname, password) VALUES("${username}", "${fullname}", "${password}")`;
    const p = await db.run(insertSql);
    const items = await db.get(`SELECT id, role FROM user WHERE username = "${username}" AND password = "${password}"`);
    console.log(items);
    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set("userID", items.id, {secure: true , expires: Date.now() + oneDay });
    cookies().set("role", items.role, {secure: true , expires: Date.now() + oneDay });
    return Response.json({ error: {errno : 0} });
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ error: err }))
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  if (!db) {
    db = await open ({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }

  try {
    const result = await db.run(`DELETE FROM user WHERE id = ${id}`);
    if (result.changes > 0) {
      console.log("deleted successfully");
      return Response.json({ message: `Deleted user ${id} successfully` }, { status: 200 });
    } else {
      console.log("error deleting");
      return Response.json({ message: `Error deleting user ${id}` }, { status: 400 });

    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
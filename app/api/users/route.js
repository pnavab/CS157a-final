import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

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
  if(typeof fullname === 'undefined'){
    try{
      const items = await db.get(`SELECT username, password FROM user WHERE username = "${username}" AND password = "${password}"`);
      if(items.length == 1) {
        console.log(items);
        return Response.status(200).json({message : "Login Succesful"})
      } else {
        return Response.status(400).json({message : "Login Unseccesful"});
      }
    }catch (err){
      console.log("error here");
      return Response.json({error : err});
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
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database.");
    }
);

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            username TEXT,
            fullname TEXT,
            password TEXT,
            role TEXT DEFAULT 'user'
        )`,
        (err) => {
            if (err) {
            return console.error(err.message);
            }
            console.log("Created person table.");
        }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS post (
          id INTEGER PRIMARY KEY,
          title TEXT,
          description TEXT,
          posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          user_id INTEGER,
          FOREIGN KEY (user_id) REFERENCES user(id)
      )`,
      (err) => {
          if (err) {
          return console.error(err.message);
          }
          console.log("Created post table.");
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS comment (
          id INTEGER PRIMARY KEY,
          description TEXT,
          commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          user_id INTEGER,
          post_id INTEGER,
          FOREIGN KEY (user_id) REFERENCES user(id),
          FOREIGN KEY (post_id) REFERENCES post(id)
      )`,
      (err) => {
          if (err) {
          return console.error(err.message);
          }
          console.log("Created comment table.");
      }
    );
    const insertSql = `INSERT INTO user(username, fullname, password) VALUES("jd", "John Doe", "1234")`
    db.run(insertSql, function(err) {
      if(err) {
        return console.error(err.message);
      }
      console.log("Inserted successfully");
    });
});
import sqlite from "sqlite3";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const client = new sqlite.Database(
  path.resolve(process.env.DB_NAME ?? "database.db"),
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
  (error) => {
    if (!error) {
      return;
    }

    console.log("There was an error connecting to the database...");
  }
);

export default client;

import client from "./client.mjs";

client.serialize(() => {
  client.run(
    `CREATE TABLE IF NOT EXISTS tokens (
        id INTEGER PRIMARY KEY,
        accessToken TEXT,
        expiresIn INT,
        idToken TEXT,
        refreshToken TEXT,
        refreshTokenExpiresIn INT,
        scope TEXT,
        tokenType TEXT,
        expirationDate TEXT,
        refreshExpirationDate TEXT
      )`,
    (error) => {
      if (!error) return;

      console.error(error);
    }
  );
});

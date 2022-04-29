require("dotenv").config();

const { getConnection } = require("./db");

async function main() {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(`DROP TABLE IF EXISTS categories`);
    await connection.query(`DROP TABLE IF EXISTS opinion_votes`);
    await connection.query(`DROP TABLE IF EXISTS opinions`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    //Meter un registrationCode (mirar ddv), una lastLogin, name, surname
    await connection.query(`
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(25) UNIQUE NOT NULL,
        active BOOLEAN DEFAULT false,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        registrationCode TINYTEXT,
        passwordUpdateCode TINYTEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        lastUpdate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        lastAuthUpdate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
    )
    `);

    await connection.query(`
    CREATE TABLE opinions(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        opinion_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (opinion_id) REFERENCES users(id)
    )
    `);

    await connection.query(`
      CREATE TABLE opinion_votes(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        opinion_id INTEGER NOT NULL,
        vote TINYINT NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (opinion_id) REFERENCES opinions(id)
      )
      `);

    await connection.query(`
  CREATE TABLE categories(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    category_id INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES opinions(id)
  )
  `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit(1);
  }
}

main();

const bcrypt = require("bcrypt");
const { getConnection } = require("./db");
const { generateError } = require("../helpers");

const createUser = async (username, email, password) => {
  let connection;

  try {
    connection = await getConnection();

    const [existingUserMail] = await connection.query(
      `
          SELECT id
          FROM users
          WHERE email=?
        `,
      [email]
    );

    if (existingUserMail.length > 0) {
      throw generateError(
        "Ya existe un usuario en la base de datos con ese email",
        409
      );
    }

    const [existingUserName] = await connection.query(
      `
          SELECT id
          FROM users
          WHERE username=?
        `,
      [username]
    );

    if (existingUserName.length > 0) {
      throw generateError(
        "Ya existe un usuario en la base de datos con ese username",
        409
      );
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const [newUser] = await connection.query(
      `
    INSERT INTO users (username,email,password) VALUES (?,?,?) 
    `,
      [username, email, passwordHash]
    );

    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const getUserById = async id => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
SELECT id, username, email, created_at FROM users WHERE id=?
`,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningún usuario con esa id", 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getUserByEmail = async email => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
SELECT * FROM users WHERE email=?
`,
      [email]
    );

    if (result.length === 0) {
      throw generateError("No hay ningún usuario con ese email", 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { createUser, getUserById, getUserByEmail };

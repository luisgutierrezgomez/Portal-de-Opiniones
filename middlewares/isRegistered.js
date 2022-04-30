const jsonwebtoken = require("jsonwebtoken");
const { getConnection } = require("../db/db");
const { generateError } = require("../helpers");

async function isRegistered(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Falta la cabecera de autorización", 401);
    }

    let tokenInfo;

    try {
      tokenInfo = jsonwebtoken.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw generateError("El token no es válido", 401);
    }

    const [result] = await connection.query(
      `
      SELECT lastAuthUpdate
      FROM users
      WHERE id=?
    `,
      [tokenInfo.id]
    );

    if (result.length === 0) {
      throw generateError("El usuario no existe en la base de datos", 401);
    }

    const tokenCreatedAt = new Date(tokenInfo.iat * 1000);
    const userLastAuthUpdate = new Date(result[0].lastAuthUpdate);
    if (tokenCreatedAt < userLastAuthUpdate) {
      throw generateError(
        "El token ya no es válido. Haz login de nuevo para conseguir otro",
        401
      );
    }
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = isRegistered;

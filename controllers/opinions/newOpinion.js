const { getConnection } = require("../../db/db");
const { generateError } = require("../../helpers");

async function newOpinionController(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { text } = req.body;

    if (!text || text.length > 65535) {
      throw generateError(
        "El campo de texto es obligatorio y debe ser como máximo de 65535 caracteres",
        400
      );
    }
    const [result] = await connection.query(
      `
    INSERT INTO opinions(opinion_id, text, created-at) VALUES (?,?,UTC_TIMESTAMP)
    `,
      [req.auth.opinion_id, text]
    );
    res.send({
      status: "ok",
      data: {
        id: result.opinion_id,
        text,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { newOpinionController };

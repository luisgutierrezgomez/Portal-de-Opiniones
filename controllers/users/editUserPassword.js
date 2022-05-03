const { getConnection } = require("../../db/db");

const { generateError } = require("../../helpers");

const { editUserPasswordSchema } = require("../../validators/userValidator");

async function editUserPasswordController(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    await editUserPasswordSchema.validateAsync(req.body);

    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (req.auth.id !== Number(id)) {
      throw generateError("No puedes cambiar la password de otro usuario", 403);
    }

    const [currentUser] = await connection.query(
      `
    SELECT id
    FROM users
    WHERE id=? AND password=SHA2(?,512)
    `,
      [id, oldPassword]
    );

    if (currentUser.length === 0) {
      throw generateError("El usuario no existe", 401);
    }

    await connection.query(
      `
    UPDATE users
    SET password=SHA2(?,512), lastUpdate=UTC_TIMESTAMP, lastAuthUpdate=UTC_TIMESTAMP
    WHERE id=?
    `,
      [newPassword, id]
    );

    res.send({
      status: "ok",
      message: "Password actualizada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editUserPasswordController };

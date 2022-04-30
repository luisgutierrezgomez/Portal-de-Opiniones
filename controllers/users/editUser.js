const { getConnection } = require("../../db/db");
const { generateError } = require("../../helpers");

const { editUserSchema } = require("../../validators/userValidator");

async function editUserController(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await editUserSchema.validateAsync(req.body);

    const { id } = req.params;
    const { email, username } = req.body;

    if (req.auth.id !== Number(id)) {
      throw generateError("No tienes permisos para editar este usuario", 403);
    }

    const [currentUser] = await connection.query(
      `
    SELECT id, email, username
    FROM users
    WHERE id=?
    `,
      [id]
    );

    if (currentUser.length === 0) {
      throw generateError(`El usuario con id ${id} no existe`, 404);
    }

    if (email !== currentUser[0].email) {
      const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM users
        WHERE email=?
        `,
        [email]
      );
      if (existingEmail.length > 0) {
        throw generateError(
          "Ya existe un usuario con este email en la base de datos",
          403
        );
      }
    } else {
      await connection.query(
        `
        UPDATE users
        SET username=?, email=?, lastUpdate=UTC_TIMESTAMP
        WHERE id=?
        `[(username, email, id)]
      );
    }

    res.send({
      status: "ok",
      message: "Usuario actualizado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editUserController };

const { getConnection } = require("../../db/db");
const { generateError } = require("../../helpers");

const deleteUserController = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE id=?
        `,
      [id]
    );

    if (user.length === 0) {
      throw generateError("El usuario con esa id no existe", 401);
    }

    await connection.query(
      `
    DELETE FROM users WHERE id=?
    `,
      [id]
    );

    res.send({
      status: "ok",
      message: `El usuario con id ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  deleteUserController,
};

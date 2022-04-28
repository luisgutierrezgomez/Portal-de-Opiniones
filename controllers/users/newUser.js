const { getConnection } = require("../../db/db");
const { createUser } = require("../../db/users");
const { generateError } = require("../../helpers");
const { newUserSchema } = require("../../validators/userValidator");

async function newUserController(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { username, role, email, password } = req.body;

    await newUserSchema.validateAsync(req.body);

    const id = await createUser(username, role, email, password);

    res.send({
      status: "ok",
      message: `Usuario creado con la id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
}

//Aquí iría la parte de enviar un mensaje de confirmación de registro al email indicado (ver en ddv)

module.exports = { newUserController };

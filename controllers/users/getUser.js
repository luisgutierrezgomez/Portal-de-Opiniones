const { getConnection } = require("../../db/db");
const { createUser, getUserById } = require("../../db/users");
const { generateError } = require("../../helpers");
const { newUserSchema } = require("../../validators/userValidator");

async function getUserController(req, res, next) {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUserController };

const { getUserByEmail } = require("../../db/users");
const { loginUserSchema } = require("../../validators/userValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../../helpers");

async function loginController(req, res, next) {
  try {
    await loginUserSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw generateError("La contraseña no coincide", 401);
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.send({
      status: "ok",
      data: token,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { loginController };

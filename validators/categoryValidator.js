const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

const categorySchema = Joi.object().keys({
  category: Joi.string()
    .valid("Política", "Economía", "Salud", "Tecnología", "Deporte")
    .required()
    .error(
      generateError(
        "El campo debe ser: Política, Economía, Salud, Tecnología o Deporte",
        400
      )
    ),
});

module.exports = { categorySchema };

const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

const newUserSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .required()
    .error(generateError("Debe existir un campo username válido", 400)),
  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "Debe existir un campo password y que sea de al menos 8 caracteres",
        400
      )
    ),
  email: Joi.string()
    .min(4)
    .required()
    .error(generateError("El campo email debe existir y ser válido")),
});

const loginUserSchema = Joi.object().keys({
  password: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "Debe existir un campo password y que sea de al menos 8 caracteres",
        400
      )
    ),
  email: Joi.string()
    .min(8)
    .required()
    .error(generateError("El campo email debe existir y ser válido")),
});

const editUserPasswordSchema = Joi.object().keys({
  oldPassword: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo oldPassword debe existir y tener al menos 8 caracteres",
        400
      )
    ),
  newPassword: Joi.string()
    .min(8)
    .required()
    .invalid(Joi.ref("oldPassword"))
    .error(
      generateError(
        "El campo newPassword debe existir, ser diferente de oldPassword y tener al menos 8 caracteres",
        400
      )
    ),
});

const editUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(generateError("El campo email debe contener un email válido", 400)),
  username: Joi.string()
    .max(25)
    .required()
    .error(
      generateError(
        "El campo nombre no debe de tener más de 25 caracteres",
        400
      )
    ),
});

const editUserMailSchema = Joi.object().keys({
  oldMail: Joi.string()
    .min(8)
    .required()
    .error(
      generateError(
        "El campo oldMail debe existir y tener al menos 8 caracteres",
        400
      )
    ),
  newMail: Joi.string()
    .min(8)
    .required()
    .invalid(Joi.ref("oldMail"))
    .error(
      generateError(
        "El campo newMail debe existir, ser diferente de oldMail y tener al menos 8 caracteres",
        400
      )
    ),
});

module.exports = {
  newUserSchema,
  loginUserSchema,
  editUserSchema,
  editUserPasswordSchema,
  editUserMailSchema,
};

const { generateError } = require("../../helpers");

const newOpinionController = async (req, res, next) => {
  const { text } = req.body;

  if (!text || text.length > 65535) {
    throw generateError(
      "El campo de texto es obligatorio y debe ser como máximo de 65535 caracteres",
      400
    );
  }
  try {
    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newOpinionController };

async function voteOpinionController(req, res, next) {
  try {
    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { voteOpinionController };

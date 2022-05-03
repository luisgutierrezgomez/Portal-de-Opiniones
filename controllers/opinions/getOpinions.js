async function getEveryOpinionController(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { search, order, direction } = req.query;

    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    let orderBy;
    switch (order) {
      case "username":
        orderBy = "username";
        break;
      case "category":
        orderBy = "category";
        break;
      default:
        orderBy = "date";
    }

    let queryResults;
    if (search) {
      queryResults = await connection.query(`
        aquí va el SELECT de la query
        `);
    }

    res.send({
      status: "error",
      message: "Not implemented",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getEveryOpinionController };

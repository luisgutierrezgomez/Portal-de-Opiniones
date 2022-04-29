require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const { newUserController } = require("./controllers/users/newUser");
const { getUserController } = require("./controllers/users/getUser");
const { loginController } = require("./controllers/users/loginUser");
const { deleteUserController } = require("./controllers/users/deleteUser");

const isRegistered = require("./middlewares/isUser");
const {
  getEveryOpinionController,
  createOpinionController,
  getSingleOpinionController,
  deleteSingleOpinionController,
  deleteEveryOpinionController,
  scoreOpinionController,
} = require("./controllers/opinions/opinions");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//Rutas de usuarios

app.post("/user", newUserController);

app.post("/users/login", loginController);

app.get("/user/:id", getUserController);

app.delete("/user/:id", deleteUserController);
// app.post("/user/:id", isUser, editUser);
// app.post("/user/:id/password", isUser, editUserPassword);

//Rutas de opiniones

app.get("/", getEveryOpinionController);
app.post("/", isRegistered, createOpinionController);
app.get("/opinion/:id", getSingleOpinionController);
app.post("/opinion/punctuation", scoreOpinionController);
app.delete("/opinion/:id", deleteSingleOpinionController);
app.delete("/", deleteEveryOpinionController);

//Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

//Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

//Lanzamos el servidor
app.listen(3000, () => {
  console.log("Server running");
});

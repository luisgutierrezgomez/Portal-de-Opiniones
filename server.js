require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const { newUserController } = require("./controllers/users/newUser");
const { getUserController } = require("./controllers/users/getUser");
const { loginController } = require("./controllers/users/loginUser");
const { editUserController } = require("./controllers/users/editUser");
const {
  editUserPasswordController,
} = require("./controllers/users/editUserPassword");

const { deleteUserController } = require("./controllers/users/deleteUser");

const { newOpinionController } = require("./controllers/opinions/newOpinion");
const {
  getEveryOpinionController,
} = require("./controllers/opinions/getOpinions");
const { editOpinionController } = require("./controllers/opinions/editOpinion");
const { voteOpinionController } = require("./controllers/opinions/voteOpinion");

const isRegistered = require("./middlewares/isRegistered");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//Rutas de usuarios

app.post("/user", newUserController);

app.post("/user/login", loginController);

app.get("/user/:id", getUserController);

app.put("/user/:id", isRegistered, editUserController);

app.post("/user/:id/password", isRegistered, editUserPasswordController);

app.delete("/user/:id", deleteUserController);

//Rutas de opiniones

app.post("/", isRegistered, newOpinionController);
app.get("/", getEveryOpinionController);
app.put("/opinion/:id", isRegistered, editOpinionController);
app.post("/opinion/punctuation", isRegistered, voteOpinionController);

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

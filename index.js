const express = require("express");
const bodyparser = require("body-parser");
const { dbConnect } = require("./config/mongo.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

//configuracion cors
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//conexión a base de datos
dbConnect();

//import routes
const authRoutes = require("./app/routes/auth");
const tareasRoutes = require("./app/routes/tareas");
const verifyToken = require("./app/helpers/validate-token");

//route middlewares
app.use("/api/user", authRoutes);
app.use("/api/task", verifyToken, tareasRoutes);
app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "Funciona!",
  });
});

//Iniciar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto: ${PORT} `);
});

const express = require("express");
const app = express();
const usersRouter = require("./src/routes/usersRouter");

app.use(usersRouter);

app.get("/", (req, res) => {
  res.json({ message: "El API ya no funciona" });
});

// Ejecutando el servidor HTTP
app.listen(8000, () =>
  console.log("Esuchando peticiones HTTP en el puerto 8000")
);

// /index

const express = require("express");
const app = express();
const apiRouter = require("./src/routes");

apiRouter(app);

app.get("/", (req, res) => {
  res.json({ message: "El API ya no funciona" });
});

// Ejecutando el servidor HTTP
app.listen(8000, () =>
  console.log("Esuchando peticiones HTTP en el puerto 8000")
);

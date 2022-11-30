const { Router } = require("express");
const routes = Router();

const products = [
  { id: 1, name: "Pantalon", price: 50 },
  { id: 2, name: "Camiseta", price: 50 },
  { id: 3, name: "Calzón", price: 50 },
  { id: 4, name: "Falda", price: 50 },
];

routes.get("/", (req, res) => {
  res.json(products);
});

module.exports = routes;

// GET de un producto
// POST de un producto
// DELETE de un producto
// PUT/PATCH de un producto

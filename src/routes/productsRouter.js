const { Router } = require("express");
const routes = Router();
const { getAll, create, getById, update } = require("../usecases/product");
const { authHandler } = require("../middlewares/authHandler");

routes.get("/", async (req, res) => {
  try {
    const payload = await getAll();
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const payload = await getById(id);
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

routes.post("/", async (req, res) => {
  const { sku, name, price } = req.body;

  try {
    const product = await create({ sku, name, price });
    const payload = {
      sku: product.sku,
      name: product.name,
      price: product.price,
    };
    res.status(201).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

routes.put("/:id", async (req, res) => {
  const { sku, name, price, stockQty } = req.body;
  try {
    const payload = await update({ sku, name, price, stockQty });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;

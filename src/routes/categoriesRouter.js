const fs = require("fs/promises");
const router = require("express").Router();
const categoryUseCases = require("../usecases/category");

const categories = [
  { id: 1, name: "Hombre" },
  { id: 2, name: "Mujer" },
  { id: 3, name: "Niños/Niñas" },
  { id: 4, name: "Mascotas" },
];

router.get("/", async (req, res) => {
  try {
    const categories = await categoryUseCases.getAll();
    res.json({ ok: true, payload: categories });
  } catch (error) {
    res.status(400).json({ ok: false, message: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { name, products } = await categoryUseCases.getById(id);
    res.json({
      ok: true,
      payload: { name, products, numberOfProducts: products.length },
    });
  } catch (error) {
    res.status(400).json({ ok: false, message: error });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const payload = await categoryUseCases.create(name);
    res.json({
      ok: true,
      message: "Category created successfully",
      payload,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, products } = req.body;

  try {
    const data = { name, products };
    const category = await categoryUseCases.update(id, data);
    res.json({ ok: true, payload: category });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, products } = await categoryUseCases.del(id);

    res.json({ ok: true, payload: { name, products } });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = router;

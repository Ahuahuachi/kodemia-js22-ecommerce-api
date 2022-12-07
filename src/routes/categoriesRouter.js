const router = require("express").Router();
const {
  getAll,
  getById,
  create,
  update,
  del,
} = require("../usecases/category");

router.get("/", async (req, res) => {
  try {
    const categories = await getAll();
    res.json({ ok: true, payload: categories });
  } catch (error) {
    res.status(400).json({ ok: false, message: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { name, products } = await getById(id);
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
    const payload = await create(name);
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
    const category = await update(id, data);
    res.json({ ok: true, payload: category });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, products } = await del(id);

    res.json({ ok: true, payload: { name, products } });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = router;

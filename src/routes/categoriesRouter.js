const { Router, json } = require("express");
const router = Router();

const categories = [
  { id: 1, name: "Hombre" },
  { id: 2, name: "Mujer" },
  { id: 3, name: "Niños/Niñas" },
  { id: 4, name: "Mascotas" },
];

router.get("/", (req, res) => {
  res.json(categories);
});

router.get("/:id", (req, res) => {
  const category = categories.find((element) => element.id == req.params.id);

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.json(category);
  }
});

router.post("/", (req, res) => {
  console.log("Request body:", req.body);

  res.json({ message: "Category created successfully" });
});

router.put("/:id", (req, res) => {
  const category = categories.find((element) => element.id == req.params.id);

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.json({ message: `Category "${category.name}" modified successfully` });
  }
});

router.delete("/:id", (req, res) => {
  const category = categories.find((element) => element.id == req.params.id);

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.json({ message: `Category "${category.name}" deleted successfully` });
  }
});

module.exports = router;

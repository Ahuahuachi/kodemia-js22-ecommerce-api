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
  const categories = await fs.readFile("./categories.json");
  const data = JSON.parse(categories.toString());
  res.json(data);
});

router.get("/:id", (req, res) => {
  const category = categories.find((element) => element.id == req.params.id);

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.json(category);
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
  const { name } = req.body;

  const fileContent = await fs.readFile("./categories.json");
  const fileContentString = fileContent.toString();
  const categories = JSON.parse(fileContentString);

  const category = categories.find((item) => item.id == id);
  const newCategories = categories.filter((item) => id != item.id);
  category.name = name;

  newCategories.push(category);

  await fs.writeFile("./categories.json", JSON.stringify(newCategories));

  res.json({ ok: true, payload: category });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const fileContent = await fs.readFile("./categories.json");
  const categories = JSON.parse(fileContent.toString());

  // const category = categories.find((element) => element.id == id);

  const newCategories = categories.filter((element) => element.id != id);

  fs.writeFile("./categories.json", JSON.stringify(newCategories));

  res.json({ message: `Category "${id}" deleted successfully` });
});

module.exports = router;

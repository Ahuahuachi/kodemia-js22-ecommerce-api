const fs = require("fs/promises");
const { Router, json } = require("express");
const router = Router();

const categories = [
  { id: 1, name: "Hombre" },
  { id: 2, name: "Mujer" },
  { id: 3, name: "Niños/Niñas" },
  { id: 4, name: "Mascotas" },
];

router.get("/", async (req, res) => {
  const categories = await fs.readFile("./categories.json");
  const data = JSON.parse(categories.toString());
  console.log(data);
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
  console.log("Request body:", req.body);

  const id = Math.ceil(Math.random() * 100);
  const { name } = req.body;

  const fileContent = await (await fs.readFile("./categories.json")).toString();

  const categories = JSON.parse(fileContent);

  categories.push({ id, name });

  const appendRes = await fs.writeFile(
    "./categories.json",
    JSON.stringify(categories)
  );

  res.json({
    message: "Category created successfully",
    payload: appendRes,
  });
});

router.put("/:id", (req, res) => {
  const category = categories.find((element) => element.id == req.params.id);

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.json({ message: `Category "${category.name}" modified successfully` });
  }
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

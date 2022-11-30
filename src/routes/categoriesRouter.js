const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Todas las categorias" });
});

module.exports = router;

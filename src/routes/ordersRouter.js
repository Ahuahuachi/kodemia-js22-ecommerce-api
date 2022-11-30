const { Router } = require("express");
const router = Router();

const orders = [
  { id: 1, products: [{}] },
  { id: 2, products: [{}] },
  { id: 3, products: [{}] },
  { id: 4, products: [{}] },
];

router.get("/", (req, res) => {
  res.json(orders);
});
router.get("/:id", (req, res) => {
  const order = orders.find((order) => req.params.id == order.id);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
  } else {
    res.json(order);
  }
});
router.post("/", (req, res) => {
  res.json({ message: "Order created successfully!" });
});
router.put("/:id", (req, res) => {
  const order = orders.find((order) => req.params.id == order.id);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
  } else {
    res.json({ message: `Order ${order.id} modified successfully` });
  }
});
router.delete("/:id", (req, res) => {
  const order = orders.find((order) => req.params.id == order.id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
  } else {
    res.json({ message: `Order ${order.id} deleted successfully` });
  }
});

module.exports = router;

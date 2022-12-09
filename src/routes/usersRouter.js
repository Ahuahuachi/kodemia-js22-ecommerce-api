const { Router } = require("express");
const routes = Router();
const { getAll, create, authenticate, getById } = require("../usecases/user");
const { authHandler } = require("../middlewares/authHandler");

const users = [
  { id: 1, username: "admin", firstName: "Admin", lastName: "System" },
  { id: 2, username: "staff", firstName: "Staff", lastName: "" },
  { id: 3, username: "customer", firstName: "John", lastName: "Doe" },
];

routes.get("/", authHandler, async (req, res) => {
  const id = req.params.token.sub;

  const { email, firstName } = await getById(id);

  res.json({ ok: true, payload: { email, firstName } });
});

routes.get("/:userid", (req, res) => {
  const data = users.find((user) => {
    return user.id == req.params.userid;
  });

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

routes.post("/", async (req, res) => {
  const { email, password, firstName } = req.body;

  const payload = await create({ email, password, firstName });
  res.json({ ok: true, payload });
});

routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const payload = await authenticate(email, password);
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.put("/", (req, res) => {
  res.status(405).json({ message: "Method not allowed" });
});

routes.put("/:id", (req, res) => {
  // Lógica para editar el usuario con el id X

  res.json({ message: `Usuario con el id ${req.params.id} modificado` });
});

routes.delete("/:id", (req, res) => {
  // Logica para eliminar el usuario con el id X

  res.json({ message: `Usuario con el id ${req.params.id} eliminado` });
});

module.exports = routes;

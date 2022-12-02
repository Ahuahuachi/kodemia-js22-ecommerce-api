const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const categoriesRouter = require("./categoriesRouter");
const ordersRouter = require("./ordersRouter");

const apiRouter = (app) => {
  app.use("/users", usersRouter);
  app.use("/products", productsRouter);
  app.use("/categories", categoriesRouter);
  app.use("/orders", ordersRouter);
};

module.exports = apiRouter;

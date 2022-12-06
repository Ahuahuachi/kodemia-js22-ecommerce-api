const Category = require("../../models/category").model;

const create = async (name) => {
  const category = new Category({ name });
  return await category.save();
};

const addProducts = async (id, products) => {};

const removeProducts = async (id, products) => {};

const del = async (id) => {};

const rename = async (id) => {};

const getOne = async (id) => {};

const getAll = async () => {};

module.exports = {
  create,
  addProducts,
  removeProducts,
  del,
  rename,
  getOne,
  getAll,
};

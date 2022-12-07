const Category = require("../../models/category").model;

const getAll = async () => {
  return await Category.find({}).exec();
};

const getById = async (id) => await Category.findById(id).exec();

const create = async (name) => {
  const category = new Category({ name });
  return await category.save();
};

const addProducts = async (id, products) => {};

const removeProducts = async (id, products) => {};

const del = async (id) => {};

const rename = async (id) => {};

module.exports = {
  create,
  addProducts,
  removeProducts,
  del,
  rename,
  getById,
  getAll,
};

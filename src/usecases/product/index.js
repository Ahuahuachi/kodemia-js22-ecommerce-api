const Product = require("../../models/product").model;

const getAll = async () => await Product.find({});

const getById = async (id) => await Product.findById(id);

const create = async (data) => {
  const { sku, price, name, stockQty } = data;

  const product = new Product({ sku, price, name, stockQty });
  return await product.save();
};

const update = async (id, data) => {
  const { sku, price, name, stockQty } = data;
  return await Product.findByIdAndUpdate(id, { sku, price, name, stockQty });
};

const del = async (id) => await Product.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, del };

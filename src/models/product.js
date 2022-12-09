const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  sku: { type: String, required: true, trim: true, unique: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  stockQty: { type: Number, default: 1 },
});

const model = mongoose.model("Product", schema);

module.exports = {
  schema,
  model,
};

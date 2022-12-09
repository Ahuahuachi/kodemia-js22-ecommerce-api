const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  products: [{ type: mongoose.ObjectId, ref: "Product" }],
});

const model = mongoose.model("Category", schema);

module.exports = {
  schema,
  model,
};

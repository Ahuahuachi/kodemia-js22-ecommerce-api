const User = require("../../models/user").model;
const { hashPassword, verifyPassword } = require("../../lib/encrypt");
const { createToken, verifyToken } = require("../../lib/jwt");

const create = async (data) => {
  const { email, password, firstName, lastName } = data;

  const hash = await hashPassword(password);

  const user = new User({ email, password: hash, firstName, lastName });
  return await user.save();
};

const getById = async (id) => await User.findById(id);

const del = async (id) => await User.findByIdAndDelete(id);

const update = async (id, data) => await User.findByIdAndUpdate(id, data);

const findByEmail = async (email) => await User.findOne({ email });

const authenticate = async (email, password) => {
  const user = await findByEmail(email);
  const hash = user.password;

  const isVerified = await verifyPassword(password, hash);
  if (!isVerified) throw new Error("Wrong password");
  return createToken({ sub: user._id });
};

module.exports = {
  create,
  getById,
  authenticate,
  update,
  del,
};

const { hash, compare } = require("bcrypt");

const hashPassword = async (password) => {
  return await hash(password, 10);
};

const verifyPassword = async (password, hash) => {
  const compareResult = await compare(password, hash);
  return compareResult;
};

module.exports = { hashPassword, verifyPassword };

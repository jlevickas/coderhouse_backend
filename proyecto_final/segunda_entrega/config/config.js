require("dotenv").config();

const PORT = process.env.PORT || 8080;
const dataBase = process.env.DATA_BASE || "mongoDB";

module.exports = {
  PORT,
  dataBase,
};

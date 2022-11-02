const config = require("../../../config/config");
const MongoCarritosDao = require("./mongoDB/CarritosDao");
const FirebaseCarritosDao = require("./firebase/CarritosDao");
const MysqlCarritosDao = require("./mysql/CarritosDao");
const FsCarritosDao = require("./fs/CarritosDao");

let dataBase = config.dataBase;
let carrito;

switch (dataBase) {
  case "mongoDB":
    carrito = new MongoCarritosDao();
    break;
  case "firebase":
    carrito = new FirebaseCarritosDao();
    break;
  case "mysql":
    carrito = new MysqlCarritosDao();
    break;
  case "fs":
    carrito = new FsCarritosDao();
    break;
  default:
    carrito = new MongoCarritosDao();
    break;
}

module.exports = carrito;

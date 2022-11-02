const config = require("../../../config/config");
const MongoProductosDao = require("./mongoDB/ProductosDao");
const FirebaseProductosDao = require("./firebase/ProductosDao");
const MysqlProductosDao = require("./mysql/ProductosDao");
const FsProductosDao = require("./fs/ProductosDao");

let dataBase = config.dataBase;
let producto;

switch (dataBase) {
  case "mongoDB":
    producto = new MongoProductosDao();
    break;
  case "firebase":
    producto = new FirebaseProductosDao();
    break;
  case "mysql":
    producto = new MysqlProductosDao();
    break;
  case "fs":
    producto = new FsProductosDao();
    break;
  default:
    producto = new MongoCarritosDao();
    break;
}

module.exports = producto;

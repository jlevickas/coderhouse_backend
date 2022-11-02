import { dataBase as _dataBase } from "../../../config/config.js";
import MongoCarritosDao from "./mongoDB/CarritosDao.js";
import FirebaseCarritosDao from "./firebase/CarritosDao.js";
import MysqlCarritosDao from "./mysql/CarritosDao.js";
import FsCarritosDao from "./fs/CarritosDao.js";

let dataBase = _dataBase;
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

export default carrito;

import { dataBase } from "../../../config/config.js";
import MongoProductosDao from "./mongoDB/ProductosDao.js";
import FirebaseProductosDao from "./firebase/ProductosDao.js";
import MysqlProductosDao from "./mysql/ProductosDao.js";
import FsProductosDao from "./fs/ProductosDao.js";

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

export default producto;

import { dataBase } from "../../../config/config.js";
import MongoUsuariosDao from "./mongoDB/UsuariosDao.js";
import FirebaseUsuariosDao from "./firebase/UsuariosDao.js";

let usuario;

switch (dataBase) {
  case "mongoDB":
    usuario = new MongoUsuariosDao();
    break;
  case "firebase":
    usuario = new FirebaseUsuariosDao();
    break;

  default:
    usuario = new MongoUsuariosDao();
    break;
}

export default usuario;

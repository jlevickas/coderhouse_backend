import ContainerDao from "./ContainerDao.js";

export default class ProductosDao extends ContainerDao {
  constructor() {
    super("./src/models/daos/fs/db/productos.txt");
  }
}

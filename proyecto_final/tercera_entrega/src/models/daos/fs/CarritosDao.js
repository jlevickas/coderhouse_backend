import ContainerDao from "./ContainerDao.js";

export default class CarritosDao extends ContainerDao {
  constructor() {
    super(".src/models/daos/fs/db/carritos.json");
  }
}

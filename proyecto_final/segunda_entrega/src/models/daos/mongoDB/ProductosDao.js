const ContainerDao = require("./ContainerDao");

export default class ProductosDao extends ContainerDao {
  constructor() {
    super("productos");
  }
}

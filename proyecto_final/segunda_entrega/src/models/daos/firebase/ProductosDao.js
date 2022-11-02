const ContainerDao = require("./ContainerDao");

module.exports = class ProductosDao extends ContainerDao {
  constructor() {
    super("productos");
  }
};

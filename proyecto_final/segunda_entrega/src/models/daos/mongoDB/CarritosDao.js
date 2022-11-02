const ContainerDao = require("./ContainerDao");

module.exports = class CarritosDao extends ContainerDao {
  constructor() {
    super("carritos");
  }
};

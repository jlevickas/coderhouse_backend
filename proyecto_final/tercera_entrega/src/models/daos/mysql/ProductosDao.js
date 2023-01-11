import ContainerDao from "./ContainerDao.js";
import { mysqlOptions } from "../../../../config/config.js";
import knex from "knex";

const myknex = knex(mysqlOptions);

export default class ProductosDao extends ContainerDao {
  constructor() {
    super("productos");

    this.createTable();
  }

  async createTable() {
    if (!(await myknex.schema.hasTable("productos"))) {
      try {
        await myknex.schema.createTable("productos", (table) => {
          table.increments("id");
          table.string("timestamp");
          table.string("nombre");
          table.string("descripcion");
          table.string("codigo");
          table.string("precio");
          table.string("stock");
          table.string("imagen");
        });
        console.log("Table created");
      } catch (error) {
        console.log(error);
      }
    }
  }
}

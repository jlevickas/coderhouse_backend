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
    if (!(await myknex.hasTable("productos"))) {
      try {
        await myknex.schema.createTable("productos", (table) => {
          table.increments("id");
          table.string("timestamp");
          table.string("productos");
        });
        console.log("Table created");
      } catch (error) {
        console.log(error);
      }
    }
  }
}

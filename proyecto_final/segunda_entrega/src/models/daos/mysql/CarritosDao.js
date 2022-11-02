import ContainerDao from "./ContainerDao.js";
import { mysqlOptions } from "../../../../config/config.js";
import knex from "knex";

const myknex = knex(mysqlOptions);

export default class CarritosDao extends ContainerDao {
  constructor() {
    super("carritos");

    this.createTable();
  }

  async createTable() {
    if (!(await myknex.hasTable("carritos"))) {
      try {
        await myknex.schema.createTable("carritos", (table) => {
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

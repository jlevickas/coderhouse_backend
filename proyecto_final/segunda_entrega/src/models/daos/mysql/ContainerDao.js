import { mysqlOptions } from "../../../../config/config.js";
import knex from "knex";

const myknex = knex(mysqlOptions);

export default class ContainerDao {
  constructor(table) {
    this.table = table;
  }

  async getById(id) {
    try {
      const result = myknex
        .from(this.table)
        .select("*")
        .where({ id: id })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const result = myknex
        .from(this.table)
        .select("*")
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async add(data) {
    try {
      myknex(this.table)
        .insert(data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, data) {
    try {
      myknex(this.table)
        .where({ id: id })
        .update(data)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      myknex(this.table)
        .where({ id: id })
        .del()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

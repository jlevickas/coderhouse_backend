module.exports = class Contenedor {
  constructor(databaseConfig, table) {
    const knex = require("knex")(databaseConfig);
    this.knex = knex;
    this.table = table;
  }

  save(elemento) {
    try {
      this.knex(this.table)
        .insert(elemento)
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

  getById(id) {
    try {
      const result = this.knex
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

  getAll() {
    try {
      const result = this.knex
        .from(this.table)
        .select("*")
        .then((res) => {
          return JSON.parse(JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
        });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  deleteById(id) {
    try {
      this.knex
        .from(this.table)
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

  deleteAll() {
    try {
      this.knex
        .from(this.table)
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
};

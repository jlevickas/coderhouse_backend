const { mariaDBOptions, sqlite3Options } = require("../db/dbConfig");

const mariaDB = require("knex")(mariaDBOptions);
const sqlite3 = require("knex")(sqlite3Options);

const createDBs = async () => {
  try {
    await mariaDB.schema.createTable("productos", (table) => {
      table.increments("id");
      table.string("title");
      table.string("price");
      table.string("thumbnail");
    });
    await sqlite3.schema.createTable("mensajes", (table) => {
      table.increments("id");
      table.string("email");
      table.string("timestamp");
      table.string("message");
    });
    console.log("DBs created");
  } catch (error) {
    console.log(error);
  }
};

createDBs();

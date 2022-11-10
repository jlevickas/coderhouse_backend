const mariaDBOptions = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "desafio",
  },
};

const sqlite3Options = {
  client: "sqlite3",
  connection: {
    filename: "./db/desafio.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = { mariaDBOptions, sqlite3Options };

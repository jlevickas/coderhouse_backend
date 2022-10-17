const express = require("express");
const Contenedor = require("./contenedor");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { mariaDBOptions, sqlite3Options } = require("./db/dbConfig");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productosDB = new Contenedor(mariaDBOptions, "productos");
const mensajesDB = new Contenedor(sqlite3Options, "mensajes");

//////////////////////////ROUTES//////////////////////////////
app.get("/", async (req, res) => {
  const productos = await productosDB.getAll();
  const mensajes = await mensajesDB.getAll();

  res.render("layouts/index.hbs", { productos, mensajes });
});

//////////////////////HANDLEBARS/////////////////////////////
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.static("public"));

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

////////////////////////SOCKET.IO////////////////////////////
io.on("connection", async (client) => {
  console.log("Nuevo cliente conectado!");

  /////////////////PRODUCTOS////////////////////////
  client.emit("productos", await productosDB.getAll());

  client.on("new-product", async (producto) => {
    productosDB.save(producto);
    io.sockets.emit("productos", await productosDB.getAll());
  });

  /////////////////MENSAJES////////////////////////
  client.emit("mensajes", await mensajesDB.getAll());

  client.on("new-message", async (mensaje) => {
    mensaje.timestamp = new Date().toLocaleString();
    mensajesDB.save(mensaje);
    io.sockets.emit("mensajes", await mensajesDB.getAll());
  });
});

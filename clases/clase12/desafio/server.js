const express = require("express");
const Contenedor = require("./contenedor");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contenedorProductos = new Contenedor("productos.txt");
const contenedorMensajes = new Contenedor("mensajes.txt");

//////////////////////////ROUTES//////////////////////////////
app.get("/", async (req, res) => {
  const productos = await contenedorProductos.getAll();
  const hayProductos = productos.length > 0;
  const mensajes = await contenedorMensajes.getAll();
  const hayMensajes = mensajes.length > 0;

  res.render("layouts/index.hbs", { hayProductos, hayMensajes });
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
  client.emit("productos", await contenedorProductos.getAll());
  client.on("new-product", async (producto) => {
    producto.id = (await contenedorProductos.getLastId()) + 1;
    await contenedorProductos.save(producto);
    io.sockets.emit("productos", await contenedorProductos.getAll());
  });

  /////////////////MENSAJES////////////////////////
  client.emit("mensajes", await contenedorMensajes.getAll());
  client.on("new-message", async (mensaje) => {
    mensaje.id = (await contenedorMensajes.getLastId()) + 1;
    mensaje.date = new Date().toLocaleString();
    await contenedorMensajes.save(mensaje);
    io.sockets.emit("mensajes", await contenedorMensajes.getAll());
  });
});

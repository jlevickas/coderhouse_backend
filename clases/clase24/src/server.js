import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import mongoContenedor from "./db/mongoContenedor.js";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new mongoContenedor("productos");
const mensajesApi = new mongoContenedor("mensajes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_ID_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use("/", authRouter);

//------------------- NORMALIZR -------------------------

import { normalize, schema } from "normalizr";

const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });
const schemaMensaje = new schema.Entity(
  "post",
  { author: schemaAuthor },
  { idAttribute: "id" }
);
const schemaMensajes = new schema.Entity(
  "posts",
  { mensajes: [schemaMensaje] },
  { idAttribute: "id" }
);

const normalizarMensajes = (mensajesConId) =>
  normalize(mensajesConId, schemaMensajes);

//---------------------- SOCKET.IO ----------------------

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("productos", await productosApi.getAll());

  socket.on("update", async (producto) => {
    await productosApi.add(producto);
    io.sockets.emit("productos", await productosApi.getAll());
  });

  socket.emit("mensajes", await listarMensajesNormalizados());

  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await mensajesApi.add(mensaje);
    io.sockets.emit("mensajes", await listarMensajesNormalizados());
  });
});

const listarMensajesNormalizados = async () => {
  const mensajes = await mensajesApi.getAll();
  const normalizedMessages = normalizarMensajes({ id: "mensajes", mensajes });
  console.log(normalizedMessages.entities.posts);
  return normalizedMessages;
};

//----------------- FAKER.JS ---------------------------

import faker from "faker";
faker.locale = "es";

app.get("/api/productos-test", (req, res) => {
  const CANT_PRODS = 5;
  const productos = [];
  for (let i = 1; i <= CANT_PRODS; i++) {
    const prod = {
      id: i,
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: `${faker.image.imageUrl()}?${i}`,
    };
    productos.push(prod);
  }
  res.json(productos);
});

//--------------------------------------------
// inicio el servidor

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

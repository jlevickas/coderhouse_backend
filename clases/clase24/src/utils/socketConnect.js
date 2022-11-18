import { Server as Socket } from "socket.io";
import mongoContenedor from "../db/mongoContenedor.js";
import normalizarMensajes from "./messageNormalizer.js";

const mensajesApi = new mongoContenedor("mensajes");
const productosApi = new mongoContenedor("productos");

const initSocketIO = (server) => {
  const io = new Socket(server);

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

  return io;
};

export default initSocketIO;

import { Server as Socket } from "socket.io";
import normalizarMensajes from "./messageNormalizer.js";
import Product from "../models/Product.js";
import Message from "../models/Message.js";

//const productosApi = new mongoContenedor("productos");

const initSocketIO = (server) => {
  const io = new Socket(server);

  io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!");

    socket.emit("productos", await Product.find());

    socket.on("update", async (producto) => {
      const product = new Product(producto);
      await product.save();
      io.sockets.emit("productos", await Product.find());
    });

    socket.emit("mensajes", await listarMensajesNormalizados());

    socket.on("nuevoMensaje", async (data) => {
      const mensaje = { data };
      console.log(mensaje);
      const mensajeNuevo = new Message(mensaje);
      mensajeNuevo.id = (await Message.countDocuments()) + 1;
      mensajeNuevo.save();
      io.sockets.emit("mensajes", await listarMensajesNormalizados());
    });
  });

  const listarMensajesNormalizados = async () => {
    const mensajes = await Message.find().lean();
    const normalizedMessages = normalizarMensajes({ id: "mensajes", mensajes });
    console.log(normalizedMessages.entities.posts);
    return normalizedMessages;
  };

  return io;
};

export default initSocketIO;

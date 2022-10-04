const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

// mensajes guardados en la base de datos
const messageArray = [
  { author: "Fede", text: "Hola soy Fede", date: "2021-04-05 10:00:00" },
  { author: "Juan", text: "Hola Soy Juan", date: "2021-04-05 10:00:00" },
  {
    author: "Segio",
    text: "Hola Hola soy Sergio",
    date: "2021-04-05 10:00:00",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

httpServer.listen(4000, () => {
  console.log("listening on http://localhost:4000");
});

io.on("connection", (client) => {
  console.log("Un cliente se conecto");
  client.emit("mensajes", messageArray);

  client.on("new-message", (mensaje) => {
    messageArray.push(mensaje);
    io.sockets.emit("mensajes", messageArray);
  });
});

import express from "express";
import { Server as HttpServer } from "http";
import handlebars from "express-handlebars";
import initSocketIO from "./utils/socketConnect.js";
import sessionMiddleware from "./middleware/session.middleware.js";
import sessionHandler from "./utils/sessionHandler.js";
import sessionRouter from "./routes/session.routes.js";
import productosRouter from "./routes/productos.routes.js";
import mongoConnection from "./db/mongodbConnection.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = new HttpServer(app);
initSocketIO(httpServer);

mongoConnection();

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(sessionHandler);
app.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));

app.use("/", sessionRouter);
app.use("/api", productosRouter);

//--------------------------------------------

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

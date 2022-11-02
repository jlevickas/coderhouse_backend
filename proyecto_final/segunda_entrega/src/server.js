import express, { json, urlencoded } from "express";
import productosRouter from "./routes/producto.routes.js";
import carritoRouter from "./routes/carrito.routes.js";
import { PORT } from "../config/config.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

app.all("*", (req, res) => {
  console.log(req);
  res.status(404).json({
    error: "-2",
    descripcion: `Ruta ${req.url} (metodo ${req.method}) no implementada`,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

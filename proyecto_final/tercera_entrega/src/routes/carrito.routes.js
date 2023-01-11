import { Router as _Router } from "express";
const Router = _Router;
import {
  crearCarrito,
  eliminarCarrito,
  listarProductosEnCarrito,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
} from "../controllers/carrito.controllers.js";

const carritoRouter = new Router();

carritoRouter.post("/", crearCarrito);
carritoRouter.delete("/:id", eliminarCarrito);
carritoRouter.get("/:id/productos", listarProductosEnCarrito);
carritoRouter.post("/:id/productos/:id_prod", agregarProductoAlCarrito);
carritoRouter.delete("/:id/productos/:id_prod", eliminarProductoDelCarrito);

export default carritoRouter;

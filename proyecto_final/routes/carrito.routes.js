const express = require("express");
const Router = express.Router;
const {
  crearCarrito,
  eliminarCarrito,
  listarProductosEnCarrito,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
} = require("../controllers/carrito.controllers");

const carritoRouter = new Router();

carritoRouter.post("/", crearCarrito);
carritoRouter.delete("/:id", eliminarCarrito);
carritoRouter.get("/:id/productos", listarProductosEnCarrito);
carritoRouter.post("/:id/productos", agregarProductoAlCarrito);
carritoRouter.delete("/:id/productos/:id_prod", eliminarProductoDelCarrito);

module.exports = carritoRouter;

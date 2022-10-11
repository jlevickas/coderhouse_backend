const express = require("express");
const Router = express.Router;
const {
  listarProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controllers");

const productosRouter = new Router();

productosRouter.get("/:id?", listarProductos);
productosRouter.post("/", agregarProducto);
productosRouter.put("/:id", actualizarProducto);
productosRouter.delete("/:id", eliminarProducto);

module.exports = productosRouter;

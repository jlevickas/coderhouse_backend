const express = require("express");
const Router = express.Router;
const {
  listarProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controllers");

const productosRouter = new Router();

let administrador = true;

const adminAuthMiddleware = (req, res, next) => {
  if (!administrador) {
    return res.status(403).json({
      error: -1,
      descripcion: `Ruta ${req.url} (metodo ${req.method}) no autorizada`,
    });
  }
  next();
};

productosRouter.get("/:id?", listarProductos);
productosRouter.post("/", adminAuthMiddleware, agregarProducto);
productosRouter.put("/:id", adminAuthMiddleware, actualizarProducto);
productosRouter.delete("/:id", adminAuthMiddleware, eliminarProducto);

module.exports = productosRouter;

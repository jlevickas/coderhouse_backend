const express = require("express");
const {
  getProductos,
  getProducto,
  postProducto,
  putProducto,
  deleteProducto,
} = require("./routes.js");

const app = express();
const PORT = 8080;
const Router = express.Router;
const productosRouter = new Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);

app.use("/", express.static(__dirname + "/public"));
app.post("/", postProducto);

productosRouter.get("/", getProductos);
productosRouter.get("/:id", getProducto);
productosRouter.post("/", postProducto);
productosRouter.put("/:id", putProducto);
productosRouter.delete("/:id", deleteProducto);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const express = require("express");
const productosRouter = require("./routes/producto.routes");
const carritoRouter = require("./routes/carrito.routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

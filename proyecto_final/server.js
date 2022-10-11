const express = require("express");
const productosRouter = require("./routes/producto.routes");
const carritoRouter = require("./routes/carrito.routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

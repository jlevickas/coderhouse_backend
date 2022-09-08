const express = require("express");
const productos = require("./contenedor");

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

app.get("/productos", async (req, res) => {
  const array = await productos.getAll();
  res.json(array);
});

app.get("/productoRandom", async (req, res) => {
  const array = await productos.getAll();
  const cantidad = Object.keys(array).length;
  const randProduct = await productos.getById(
    Math.floor(Math.random() * cantidad + 1)
  );

  res.json(randProduct);
});

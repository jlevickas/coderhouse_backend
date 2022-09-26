const express = require("express");
const contenedor = require("./contenedor");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("form.pug");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();
  console.log(productos);
  res.render("productos.pug", { productos });
});

app.post("/productos", async (req, res) => {
  const producto = req.body;
  contenedor.save(producto);
  producto.id = (await contenedor.getLastId()) + 1;
  res.redirect("productos");
});

app.set("views", "./pug-views");
app.set("view engine", "pug");
app.use(express.static("/"));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

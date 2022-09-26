const express = require("express");
const contenedor = require("./contenedor");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("pages/form.ejs");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();
  console.log(productos);
  res.render("pages/productos.ejs", { productos });
});

app.post("/productos", async (req, res) => {
  const producto = req.body;
  contenedor.save(producto);
  producto.id = (await contenedor.getLastId()) + 1;
  res.redirect("productos");
});

app.set("views", "./ejs-views");
app.set("view engine", "ejs");
app.use(express.static("/"));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

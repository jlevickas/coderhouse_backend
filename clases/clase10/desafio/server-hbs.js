const express = require("express");
const contenedor = require("./contenedor");
const handlebars = require("express-handlebars");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("layouts/form.hbs");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();
  console.log(productos);
  res.render("layouts/productos.hbs", {
    productos,
    hayProductos: productos.length,
  });
});

app.post("/productos", async (req, res) => {
  const producto = req.body;
  contenedor.save(producto);
  producto.id = (await contenedor.getLastId()) + 1;
  res.redirect("productos");
});

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/hbs-views/layouts",
    partialsDir: __dirname + "/hbs-views/partials",
  })
);

app.set("views", "./hbs-views");
app.set("view engine", "hbs");
app.use(express.static("/"));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

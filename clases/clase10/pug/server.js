const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Titulo de la pagina",
    mensaje: "Mensaje de la pagina",
  });
});

app.get("/datos", (req, res) => {
  const { max, min, value, title } = req.query;
  res.render("medidor", { max, min, value, title });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

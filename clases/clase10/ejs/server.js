const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

const personas = [];

app.get("/", (req, res) => {
  res.render("pages/index", { personas });
});

app.post("/personas", (req, res) => {
  personas.push(req.body);
  res.render("pages/index", { personas });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

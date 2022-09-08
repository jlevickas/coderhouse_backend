const express = require("express");

const app = express();
const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

let count = 0;
app.get("/visitas", (req, res) => {
  count++;
  res.send(`<h1>Count: ${count}</h1>`);
});

app.get("/fyh", (req, res) => {
  const date = new Date();
  res.send({ fyh: date });
});

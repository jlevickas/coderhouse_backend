const http = require("http");

const date = new Date();
const currentHour = date.getHours();

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  if (currentHour > 6 && currentHour < 12) {
    res.end("Buen dia!");
  } else if (currentHour < 18) {
    res.end("Buenas tardes!");
  } else {
    res.end("Buenas noches!");
  }
});

const port = 3000;

const connectServer = server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

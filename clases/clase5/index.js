let resultados = {};

const agregar = (rand) => {
  if (resultados[rand]) {
    resultados[rand]++;
  } else {
    resultados[rand] = 1;
  }
};

for (let i = 0; i < 1000; i++) {
  let rand = Math.ceil(Math.random() * 20);
  agregar(rand);
}
console.log(resultados);

////////////////////////////////////////////////////////////////////////////////////////////////

const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
  { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 },
];

let nombres = "";
let precioTotal = 0;

for (prod in productos) {
  nombres += productos[prod].nombre + ",";
  precioTotal += productos[prod].precio;
}

let precioPromedio = precioTotal / productos.length;

console.log(nombres);

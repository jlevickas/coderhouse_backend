// defino clase usuario
class usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({
      nombre,
      autor,
    });
  }
  getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }
}

// creo un objeto usuario de ejemplo
const usuario1 = new usuario(
  "Carlos",
  "Chaplin",
  [{ nombre: "1984", autor: "George Orwell" }],
  ["perro", "tortuga"]
);

// llamo a los metodos del objeto
console.log(usuario1.getFullName());

usuario1.addMascota("gato");

console.log(usuario1.countMascotas());

usuario1.addBook("The Hitchhiker's Guide to the Galaxy", "Douglas Adams");

console.log(usuario1.getBookNames());

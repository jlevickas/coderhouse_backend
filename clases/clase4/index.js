const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async #leerArchivo() {
    // creo un metodo privado para leer el archivo
    try {
      const archLeido = await fs.promises.readFile(this.archivo, "utf-8");
      const array = JSON.parse(archLeido);
      return array;
    } catch (error) {
      // da error cuando el archivo esta vacio o no es un JSON. en ese caso retorna undefined
      console.log(error);
    }
  }

  async #escribirArchivo(array) {
    // creo un metodo privado para escribir el archivo
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(array, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async save(elemento) {
    try {
      const array = await this.#leerArchivo(this.archivo);

      if (array) {
        // uso el largo del array para asignar el id del elemento nuevo
        const id = array.length + 1;
        elemento.id = id;

        // agrego el elemento nuevo al array y escribo el archivo
        array.push(elemento);
        this.#escribirArchivo(array);

        // si el archivo NO existe, agrego el elemento nuevo a un array vacio y le asigno el id 1
      } else {
        const array = [];
        const id = 1;
        elemento.id = id;
        array.push(elemento);
        this.#escribirArchivo(array);
      }
      return elemento.id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // leo el archivo, lo parseo y uso .find para buscar el elemento con el id del parametro
    try {
      const array = await this.#leerArchivo(this.archivo);
      const elemento = array.find((elemento) => elemento.id === id);

      return elemento;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    // leo el archivo y lo parseo
    const array = this.#leerArchivo(this.archivo);
    return array;
  }

  async deleteById(id) {
    // uso .filter para crear un array nuevo sin el elemento con el id del parametro. luego reescribo el archivo con el array nuevo
    try {
      const array = await this.#leerArchivo(this.archivo);
      const arrayNuevo = array.filter((elemento) => elemento.id !== id);

      this.#escribirArchivo(arrayNuevo);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const arrayVacio = [];

      this.#escribirArchivo(arrayVacio);
    } catch (error) {
      console.log(error);
    }
  }
}

const contenedor = new Contenedor("productos.txt");

/* contenedor.save({
  title: "otro producto",
  price: 100,
  thumbnail: "imagen2.jpg",
}); */

//contenedor.getById(1).then((elemento) => console.log(elemento));

contenedor.getAll().then((array) => console.log(array));

contenedor.deleteById(2);

//contenedor.deleteAll();

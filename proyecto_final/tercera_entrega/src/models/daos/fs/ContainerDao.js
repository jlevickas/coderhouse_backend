import { promises as fs } from "fs";

export default class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async #leerArchivo() {
    // creo un metodo privado para leer el archivo
    try {
      const archLeido = await fs.readFile(this.archivo, "utf-8");
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
      await fs.writeFile(this.archivo, JSON.stringify(array, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async add(elemento) {
    try {
      const array = (await this.#leerArchivo(this.archivo)) || [];
      let id = 1;
      elemento = { timestamp: Date.now(), ...elemento };

      // busco el primer id que no este en uso
      const idExists = (id) => {
        return Object.values(array).some((el) => el.id === id);
      };

      if (array.length > 0) {
        while (idExists(id)) {
          id++;
        }
      }

      array.push({ id: id, ...elemento });
      this.#escribirArchivo(array);

      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // leo el archivo, lo parseo y uso .find para buscar el elemento con el id del parametro
    try {
      const array = await this.#leerArchivo(this.archivo);

      const elemento = await array.find((el) => el.id === parseInt(id));

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
      const arrayNuevo = array.filter(
        (elemento) => elemento.id !== parseInt(id)
      );

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

  async getNextId() {
    try {
      const array = await this.#leerArchivo(this.archivo);
      if (array.length === 0) {
        return 1;
      }
      const lastId = array[Object.keys(array).pop()].id;
      return lastId + 1;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, data) {
    try {
      const array = await this.#leerArchivo(this.archivo);
      const index = array.findIndex((el) => el.id === parseInt(id));
      array[index] = { ...array[index], ...data };
      this.#escribirArchivo(array);
    } catch (error) {
      console.log(error);
    }
  }
}

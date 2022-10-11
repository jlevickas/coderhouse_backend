const contenedor = require("../contenedor");
const Carrito = new contenedor("txt/carrito.txt");

const crearCarrito = async (req, res) => {
  try {
    const carrito = {
      productos: [],
    };
    const id = await Carrito.save(carrito);
    res.json({ id: id });
  } catch (error) {
    console.log(error);
  }
};

const eliminarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.getById(parseInt(req.params.id));
    if (carrito) {
      Carrito.deleteById(carrito.id);
      res.json({ msg: "Carrito eliminado" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const listarProductosEnCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.getById(parseInt(req.params.id));
    if (carrito) {
      res.json(carrito.productos);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch {
    console.log(error);
  }
};

const agregarProductoAlCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.getById(parseInt(req.params.id));
    if (carrito) {
      const producto = req.body;
      carrito.productos.push(producto);

      Carrito.deleteById(carrito.id);
      Carrito.save(carrito);
      res.json({ msg: "Producto agregado al carrito" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const eliminarProductoDelCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.getById(parseInt(req.params.id));
    // chequeo si el carrito existe
    if (carrito) {
      const idProductoAEliminar = req.params.id_prod;
      // chequeo si el producto a eliminar existe en el carrito. si existe, lo filtro
      if (
        carrito.productos.find(
          (producto) => producto.id === idProductoAEliminar
        )
      ) {
        carrito.productos = carrito.productos.filter(
          (producto) => producto.id !== idProductoAEliminar
        );
        Carrito.deleteById(carrito.id);
        Carrito.save(carrito);
        res.json({ msg: "Producto eliminado del carrito" });
      } else {
        res.status(404).json({ error: "Producto no encontrado en carrito" });
      }
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch {
    console.log(error);
  }
};

module.exports = {
  crearCarrito,
  eliminarCarrito,
  listarProductosEnCarrito,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
};

const contenedor = require("../contenedor");
const Carrito = new contenedor("db/carrito.txt");
const Productos = new contenedor("db/productos.txt");

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
      if (carrito.productos.length > 0) {
        res.json(carrito.productos);
      } else {
        res.json({ msg: "Carrito vacío" });
      }
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch {
    console.log(error);
  }
};

const agregarProductoAlCarrito = async (req, res) => {
  try {
    const carritoElegido = await Carrito.getById(parseInt(req.params.id));
    if (carritoElegido) {
      const idProducto = await parseInt(req.params.id_prod);
      const producto = await Productos.getById(idProducto);

      if (producto) {
        carritoElegido.productos.push(producto);
        await Carrito.deleteById(carritoElegido.id);
        Carrito.save(carritoElegido);
        res.json({ msg: "Producto agregado al carrito" });
      } else {
        res
          .status(404)
          .json({ error: `Producto con id ${idProducto} no encontrado` });
      }
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
      const idProductoAEliminar = parseInt(req.params.id_prod);
      // chequeo si el producto a eliminar existe en el carrito. si existe, lo filtro
      if (
        carrito.productos.find(
          (producto) => producto.id === idProductoAEliminar
        )
      ) {
        carrito.productos = carrito.productos.filter(
          (producto) => producto.id !== idProductoAEliminar
        );
        await Carrito.deleteById(carrito.id);
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

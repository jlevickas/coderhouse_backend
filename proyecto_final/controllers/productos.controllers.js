const contenedor = require("../contenedor");
const Productos = new contenedor("txt/productos.txt");

const listarProductos = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const producto = await Productos.getById(id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } else {
      const productos = await Productos.getAll();
      if (productos) {
        res.json(productos);
      } else {
        res.status(404).json({ error: "No hay productos cargados" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const agregarProducto = async (req, res) => {
  try {
    const producto = req.body;
    const id = await Productos.save(producto);
    res.json({ id: id });
  } catch (error) {
    console.log(error);
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const productoDesactualizado = await Productos.getById(
      parseInt(req.params.id)
    );

    if (productoDesactualizado) {
      const productoActualizado = req.body;

      productoActualizado.id = productoDesactualizado.id;
      contenedor.deleteById(productoDesactualizado.id);
      contenedor.save(productoActualizado);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const producto = await Productos.getById(parseInt(req.params.id));
    if (producto) {
      await Productos.deleteById(producto.id);
      res.json({ id: producto.id });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listarProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
};

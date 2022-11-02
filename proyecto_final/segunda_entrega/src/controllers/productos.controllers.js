import Productos from "../models/daos/ProductosDao.js";

const listarProductos = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
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
    const producto = {
      nombre: req.body.nombre || "",
      descripcion: req.body.descripcion || "",
      codigo: req.body.codigo || "",
      imagen: req.body.imagen || "",
      precio: req.body.precio || 0,
      stock: req.body.stock || false,
    };
    const id = await Productos.add(producto);
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
      await Productos.deleteById(productoDesactualizado.id);
      Productos.save(productoActualizado);

      res.json({
        msg: `Producto con id ${productoActualizado.id} actualizado`,
      });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const producto = await Productos.getById(req.params.id);
    if (producto) {
      await Productos.deleteById(req.params.id);
      res.json({ id: producto.id });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  listarProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
};

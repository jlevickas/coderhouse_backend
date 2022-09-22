const contenedor = require("./contenedor.js");

const getProductos = async (req, res) => {
  const productos = await contenedor.getAll();
  res.json(productos);
};

const getProducto = async (req, res) => {
  try {
    const producto = await contenedor.getById(parseInt(req.params.id));

    if (!producto) throw new Error("producto no encontrado");

    return res.json(producto);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const postProducto = async (req, res) => {
  const producto = req.body;
  contenedor.save(producto);
  producto.id = (await contenedor.getLastId()) + 1;
  res.json(producto);
};

const putProducto = async (req, res) => {
  try {
    const productoDesactualizado = await contenedor.getById(
      parseInt(req.params.id)
    );

    if (!productoDesactualizado) throw new Error("producto no encontrado");

    const productoActualizado = req.body;
    productoActualizado.id = productoDesactualizado.id;

    contenedor.deleteById(productoDesactualizado.id);
    contenedor.save(productoActualizado);

    res.json(`Producto con id ${producto.id} actualizado`);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  contenedor.deleteById(parseInt(req.params.id));

  res.json(`Producto con id ${req.params.id} eliminado`);
};

module.exports = {
  getProductos,
  getProducto,
  postProducto,
  putProducto,
  deleteProducto,
};

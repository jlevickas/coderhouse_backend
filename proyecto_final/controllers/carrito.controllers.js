const contenedor = require("../contenedor");
const Carrito = new contenedor("txt/carrito.txt");

const crearCarrito = async (req, res) => {
  try {
    const carrito = req.body;
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

const listarProductosEnCarrito = async (req, res) => {};

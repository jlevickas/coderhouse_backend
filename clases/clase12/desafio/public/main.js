const socket = io();

//////////////////////PRODUCTOS////////////////////////
const addProduct = () => {
  const product = {
    producto: document.getElementById("producto").value,
    precio: document.getElementById("precio").value,
    imagen: document.getElementById("imagen").value,
  };

  socket.emit("new-product", product);
  return false;
};

const renderProducts = (productos) => {
  const html = productos
    .map((producto) => {
      return ` <tr>
      <td>${producto.producto}</td>
      <td>${producto.precio}</td>
      <td><img src="${producto.imagen}" width="20" height="20" /></td>
    </tr>`;
    })
    .join(" ");

  document.getElementById("productos").innerHTML = html;
};

socket.on("productos", (productos) => {
  productos.length > 0 ? renderProducts(productos) : null;
});

//////////////////////MENSAJES////////////////////////
const addMessage = () => {
  const message = {
    email: document.getElementById("email").value,
    mensaje: document.getElementById("mensaje").value,
  };

  socket.emit("new-message", message);
  return false;
};

const renderMessages = (mensajes) => {
  const html = mensajes
    .map((mensaje) => {
      return ` <div>
      <strong style="color:blue">${mensaje.email}</strong>:
      <span style="color:brown">${mensaje.date}: </span>
      <i style="color:green">${mensaje.mensaje}</i>
      </div>`;
    })
    .join(" ");

  document.getElementById("mensajes").innerHTML = html;
};

socket.on("mensajes", (mensajes) => {
  mensajes.length > 0 ? renderMessages(mensajes) : null;
});

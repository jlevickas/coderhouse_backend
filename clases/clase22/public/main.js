const socket = io();
const schema = normalizr.schema;
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;

const authorSchema = new schema.Entity("author", {}, { idAttribute: "email" });

const messageSchema = new schema.Entity(
  "message",
  {
    author: authorSchema,
  },
  { idAttribute: "email" }
);

//////////////////////PRODUCTOS////////////////////////
const addProduct = () => {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };

  socket.emit("new-product", product);
  return false;
};

const renderProducts = (productos) => {
  const table = document.querySelector("table");
  const noProductos = document.querySelector("#noProductos");
  if (productos.length) {
    const html = productos
      .map((producto) => {
        return ` <tr>
      <td>${producto.title}</td>
      <td>${producto.price}</td>
      <td><img src="${producto.thumbnail}" width="20" height="20" /></td>
    </tr>`;
      })
      .join(" ");

    table.children[1].innerHTML = html;
    table.style.display = "table";
    noProductos.style.display = "none";
  } else {
    table.style.display = "none";
    noProductos.style.display = "block";
  }
};

socket.on("productos", (productos) => {
  renderProducts(productos);
});

/////////////////////MOCKS/////////////////////////
const getMockProducts = async () => {
  const products = [];
  for (let i = 0; i < 5; i++) {
    const product = await fetch("http://localhost:8080/productos-test");
    const productJson = await product.json();
    products.push(productJson);
  }
  return products;
};

const renderMockProducts = async () => {
  const productos = await getMockProducts();
  const table = document.querySelector("#productos-mock");
  const html = productos
    .map((producto) => {
      return ` <tr>
      <td>${producto.title}</td>
      <td>${producto.price}</td>
      <td><img src="${producto.thumbnail}" width="20" height="20" /></td>
    </tr>`;
    })
    .join(" ");

  table.children[1].innerHTML = html;
  table.style.display = "table";
};

socket.on("mocks", () => {
  renderMockProducts();
});

//////////////////////MENSAJES////////////////////////
const addMessage = () => {
  const message = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  socket.emit("new-message", message);
  return false;
};

const renderMessages = (mensajes) => {
  if (mensajes.length) {
    const html = mensajes
      .map((mensaje) => {
        return ` <div>
      <strong style="color:blue">${mensaje.email}</strong>:
      <span style="color:brown">${mensaje.timestamp}: </span>
      <i style="color:green">${mensaje.message}</i>
      </div>`;
      })
      .join(" ");

    document.getElementById("mensajes").innerHTML = html;
  } else {
    document.getElementById("mensajes").innerHTML = "No hay mensajes";
  }
};

socket.on("mensajes", async (mensajes) => {
  renderMessages(
    await denormalize(mensajes, [messageSchema], { author: authorSchema })
  );
  console.log(
    await denormalize(mensajes, [messageSchema], { author: authorSchema })
  );
});

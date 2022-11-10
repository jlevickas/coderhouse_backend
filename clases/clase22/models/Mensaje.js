const { schema } = require("normalizr");

const authorSchema = new schema.Entity("author", {}, { idAttribute: "email" });

const messageSchema = new schema.Entity("message", {
  author: authorSchema,
});

module.exports = messageSchema;

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

module.exports = class mongoContenedor {
  constructor(collection) {
    this.collectionName = collection;
    this.collection = connection.collection(collection);
  }

  async getAll() {
    try {
      const result = await this.collection.find().toArray();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(data) {
    try {
      const result = await this.collection.insertOne(data);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

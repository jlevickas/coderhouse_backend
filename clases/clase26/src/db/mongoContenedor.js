import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default class mongoContenedor {
  constructor(collection) {
    this.collectionName = collection;
    this.collection = mongoose.connection.collection(collection);
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
      const id = await this.getNextId();
      const result = await this.collection.insertOne({ data, id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getNextId() {
    try {
      const result = await this.collection.countDocuments();
      if (result === 0) return 0;
      return result + 1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

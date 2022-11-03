import mongoose from "mongoose";
import { mongoUri } from "../../../../config/config.js";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

export default class ContainerDao {
  constructor(collection) {
    this.collectionName = collection;
    this.collection = connection.collection(collection);
  }

  async getById(id) {
    try {
      const result = await this.collection.findOne({ id: parseInt(id) });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
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

  async updateById(id, data) {
    try {
      const result = await this.collection.updateOne(
        { id: parseInt(id) },
        { $set: data }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteById(id) {
    try {
      const result = await this.collection.deleteOne({ id: parseInt(id) });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getNextId() {
    try {
      const result = await this.collection
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray();
      if (result[0]) {
        return result[0].id + 1;
      } else {
        return 1;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

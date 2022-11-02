import { connection } from "mongoose";

export default class ContainerDao {
  constructor(collection) {
    this.collectionName = collection;
    this.collection = connection.collection(collection);
  }

  async get(id) {
    try {
      const result = await this.collection.findOne({ _id: id });
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

  async update(id, data) {
    try {
      const result = await this.collection.updateOne(
        { _id: id },
        { $set: data }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id) {
    try {
      const result = await this.collection.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async query(options) {
    try {
      const result = await this.collection.find(options).toArray();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteAll() {
    try {
      const result = await this.collection.deleteMany({});
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

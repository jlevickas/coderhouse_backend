import admin from "firebase-admin";
import { firebaseServiceAccount } from "../../../../config/config.js";

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
});

const db = admin.firestore();

export default class ContainerDao {
  constructor(collection) {
    this.collectionName = collection;
    this.collection = db.collection(collection);
  }

  async getById(id) {
    try {
      const result = await this.collection.doc(id).get();
      return result.data();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll() {
    try {
      const result = await this.collection.get();
      return result.docs.map((doc) => doc.data());
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(data) {
    try {
      const result = await this.collection.add(data);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateById(id, data) {
    try {
      const result = await this.collection.doc(id).update(data);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteById(id) {
    try {
      const result = await this.collection.doc(id).delete();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

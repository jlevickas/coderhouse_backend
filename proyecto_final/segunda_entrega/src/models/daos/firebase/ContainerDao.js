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
      console.log(id);
      const result = await this.collection.where("id" == id.toString()).get();
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

  async getNextId() {
    try {
      const result = await this.collection.orderBy("id", "desc").limit(1).get();

      if (result.empty) {
        return 1;
      } else {
        return result.docs[0].data().id + 1;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

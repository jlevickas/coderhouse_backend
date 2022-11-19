import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoConnection = async () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });

  return db;
};

export default mongoConnection;

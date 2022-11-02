import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const dataBase = process.env.DATA_BASE || "mongoDB";

export { PORT, dataBase };

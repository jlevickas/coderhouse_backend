import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const dataBase = process.env.DATA_BASE || "mongoDB";

const mongoUri = process.env.MONGO_URI;

const firebaseServiceAccount = {
  type: "service_account",
  project_id: "proyecto-coderhouse-b9599",
  private_key_id: "0870619df03d586bb5ac3c0841000d0014d3e3b3",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, ""),
  client_email:
    "firebase-adminsdk-855rm@proyecto-coderhouse-b9599.iam.gserviceaccount.com",
  client_id: "113920610397669704603",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-855rm%40proyecto-coderhouse-b9599.iam.gserviceaccount.com",
};

const mysqlOptions = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

export { PORT, dataBase, mongoUri, firebaseServiceAccount, mysqlOptions };

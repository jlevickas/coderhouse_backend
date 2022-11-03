import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const dataBase = process.env.DATA_BASE || "fs";

const mongoUri =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:adminpassword@cluster0.panqhbo.mongodb.net/?retryWrites=true&w=majority"; // mongoDB Atlas (ESTO NO SE DEBE COMPARTIR EN UN PROYECTO REAL)

const firebaseServiceAccount = {
  type: "service_account",
  project_id: "proyecto-coderhouse-b9599",
  private_key_id: "0870619df03d586bb5ac3c0841000d0014d3e3b3",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCGkG0DflvVXvHV\ng+98ap50pCEERUThCGO6J1ZHJSNa/tqW422Zr5EsUyi4XZTychLLDjNcXxAnH6zh\n0IA5jTKjDJD4Ty+QUT+ILIxiivaa3box412Aw76TYGYOiVex330V4hNqmOCiVuU8\nZFH53FqoPz5OtcyhWb4qTgjwuvDSZcnybXAW7jBvCP97uh/HD8ZVfFzhhAzmKHxg\nVG8+EYNFOMf3+DwJYqKuyAdlMfmZzOAKzEUQBnFz89g8UT5hn8cjbfxGnCsMYRyf\n0wxt87KRYZT03oe+9o41Y4Hh0oPJrDlssczqeTgbnCMa70wA3PNEy9mngVZ1ZRn1\nInoUL0A5AgMBAAECggEAAiQl2pfgozZgYmrih9gfJFurkNNUrhYBlufjAL0lC7Yh\nc/mIzW4UlnV49jy6+YP6K5P9b5CtrkmxPmNLHwn8TnQ35v5E6KbPptLlUE4bcB8W\nGY7KIUSRcZaSQ9Sd+h0ZyEbcKJE9MH1x0V0GoZNcN/AlsCqcEnczRki5Q1yzfKLk\nbw/4k1z9ztNakwz1fxBjsg5z8VSvyHhp7ZrYsnFGwqZmYIOvBAGeqbidorbH5sMe\nW0wDRkNtPvWJQNSPAmw4DRg8G/WtnM7bAr0l3XhNHvT/J4xoGV+h9pdnBeoF5EeV\n1rO6ce7UdESS6y0S/J93/+7eAwO0589/dbkkOJnuxwKBgQC7PU8yVWH2nnpiSI4F\nm7FdQJHk7/9wRu7naT23ALDb+VveDCKv7p6kzaVMXBwPD44prf1PmFF38Kajj4Fd\nHJtOdKneXj1ea6/eM2TShVx9NDIWLR0EcNF/RazZPToq4AHSWPHA5WwRAdZAwsDa\nLpEBU/K0KDada12FRb1yPAGrKwKBgQC3+wXdCOK3oTh5LY8P5PFPe5L0DF3rgcJi\nBcAcsehbYLCY2bG9cPq79v9LDeSgjn7BObxyuE1LvMxwCIwAc2Yj1N5qXpUoEwOw\ngpEuq00hqWuxizAbzjCtV4u2MI0aR9sPvJYn17uY+1NxPLrSdAqTNSqpOqAMawUZ\nuYQ4jfaAKwKBgQCHo55fpCLXeW7HDDB2N5eBKmmGI6Y0O+6NjVu72rBEapv2e2wV\nbxNV5/O7IW7iKi6eWwCKTJmX/al6C1d3kGWhrDnycOqcH/7DRQ/gweOCf/FYx02i\nDeh1/o98wDIHJUesjep0Br8GgwIm3+69H8bD44CKqicGWuTgyui2fGnpCQKBgCq4\nnWnwEEU3qJdq3teAABDGzx7gaEaxgOOmFjATl7LwRtGXa1BkFbTj6/APr9EghYp0\nz6+L4Fb/5jD1qxzHryYO3f6xK818bNTl3LSLjoOMhbdabLdoL6FwvL53k6xQlyuW\nTP+/do5VfdDDm1YXIAWCyP8238dCapLIo01GmcC1AoGALZPPSpJZd2PG05mEUnot\nP3sCKwhABQXieqLg0ox8V3RELlldT6Jdyp3M51hPh8ztYxKDA+uMbZosbvRP6MkJ\n+akGL9EJfi7qlhm4NXPukFQ3M80sJ10qHKJY9vif3Nucg56PIoYxCU9Jq9ieSBDB\n3efcXha5vRszrk88UQUEewM=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-855rm@proyecto-coderhouse-b9599.iam.gserviceaccount.com",
  client_id: "113920610397669704603",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-855rm%40proyecto-coderhouse-b9599.iam.gserviceaccount.com",
}; // firebase config (ESTO NO SE DEBE COMPARTIR EN UN PROYECTO REAL)

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

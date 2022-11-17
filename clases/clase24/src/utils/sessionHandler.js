import MongoStore from "connect-mongo";
import session from "express-session";

import dotenv from "dotenv";
dotenv.config();

const sessionHandler = session({
  secret: process.env.SESSION_ID_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 10 }, // 10 minutos
});

export default sessionHandler;

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { join } from "node:path";
import cors from "cors";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const mongUrl = process.env.DB_URL;

mongoose
  .connect(mongUrl)
  .then(() => {
    console.log("Connexion à la base de donnée réussie");
  })
  .catch((err) => {
    console.log("Connexion à la base de donnée échoué" + err);
  });
app.use(cookieParser());
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use(router);

app.listen(process.env.API_PORT, () => {
  console.log("server up");
});

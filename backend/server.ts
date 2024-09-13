import { connect } from "mongoose";
import config from "./config.js";
import cors from "cors";
import express from "express";
import {MovieRoutes} from "./routes/movieRoutes.js";

const serverUp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", new MovieRoutes().router);
  app.listen(config.PORT, () =>
    console.log("Servidor corriendo en el puerto", config.PORT)
  );
  connect(config.mongoURL)
    .then(() => {
      console.log("Conexión a MongoDB exitosa");
    })
    .catch((err) => console.error("Error conectando a MongoDB:", err));
}

serverUp() 
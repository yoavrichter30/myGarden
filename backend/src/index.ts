import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route";
import http from 'http';
import bodyParser from "body-parser";

dotenv.config();

const init = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
      // DB
    const db = mongoose.connection;
    db.once("open", () => console.info("Connected to DB!"));
    db.on("error", (error) => console.error(`Failed connection to Db - ${error}`));
    const connectionString = process.env.DB_CONNECTION_STRING;
    mongoose.connect(connectionString!).then(() => {
      const app: Express = express();
      const port = process.env.PORT || 3000;

      // Middlewares
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      next();
      });
      
      // Routes
      app.use("/auth", authRoute);

      console.info(`Started listening on port ${port}`);
      resolve(app);
    
    });
  });

  return promise;
};

init().then((app)=> http.createServer(app).listen(process.env.PORT));
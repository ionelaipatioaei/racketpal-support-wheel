import express from "express";
const app = express();

import dotenv from "dotenv";
if (process.env.NODE_ENV == "development") {
  dotenv.config({ path: "./.env.development" });
}

import morgan from "morgan";
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import * as mongo from "./database/mongo";
mongo.test();

import scheduleRouter from "./routes/schedule";
app.use("/schedule", scheduleRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}...`);
});
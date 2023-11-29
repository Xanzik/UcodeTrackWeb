import dotenv from "dotenv";

dotenv.config();

import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { admin } from "./admin/admin.js";
import mysql from "mysql2";
import config from "./utils/config.json" assert { type: "json" };
const app = express();
const port = 5000;

const sqlScript = fs.readFileSync("./utils/db.sql", "utf8");
const sqlQueries = sqlScript.split(";").map((query) => query.trim());
const connection = mysql.createConnection(config);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRouter.js";
import { adminRouter } from "./admin/admin.js";

import errorMiddleware from "./middlewares/error-middlewares.js";

app.use(fileUpload({}));
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:3000`,
  })
);
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use(admin.options.rootPath, adminRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

sqlQueries.forEach((sql) => {
  if (sql) {
    connection.query(sql, (err, results) => {
      if (err) throw err;
      console.log("updating db...");
    });
  }
});

connection.end();

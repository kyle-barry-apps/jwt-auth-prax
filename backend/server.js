import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
const port = process.env.PORT || 8000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("tiny"));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running at port: ${port}`));

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI =
  "mongodb+srv://book-admin:ObATwSZq1oyk1wQD@cluster0.gkqfv.mongodb.net/book_management?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running and connected to MongoDB...");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

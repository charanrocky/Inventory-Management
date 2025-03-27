import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Replace with your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

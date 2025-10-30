// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import portfolioRoutes from "./src/routes/portfolioRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/comments", commentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🎨 Portfolio Showcase API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

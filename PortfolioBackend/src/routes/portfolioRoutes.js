// src/routes/portfolioRoutes.js
import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// ✅ Get all portfolios
router.get("/", async (req, res) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: { projects: true, comments: true },
    });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolios" });
  }
});

// ✅ Get one portfolio
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: Number(id) },
      include: { projects: true, comments: true },
    });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

// ✅ Create new portfolio
router.post("/", async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const newPortfolio = await prisma.portfolio.create({
      data: { title, description, userId },
    });
    res.json(newPortfolio);
  } catch (err) {
    res.status(500).json({ error: "Failed to create portfolio" });
  }
});

export default router;

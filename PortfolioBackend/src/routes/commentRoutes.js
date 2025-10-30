// src/routes/commentRoutes.js
import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// ✅ Get comments for a portfolio
router.get("/:portfolioId", async (req, res) => {
  const { portfolioId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { portfolioId: Number(portfolioId) },
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to load comments" });
  }
});

// ✅ Add new comment
router.post("/", async (req, res) => {
  const { content, authorName, portfolioId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorName,
        portfolioId: Number(portfolioId),
      },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

export default router;

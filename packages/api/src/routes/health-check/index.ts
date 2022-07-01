import express from "express";

const router = express.Router();

router.get("/api/v1/health-check", (req, res) => {
  res.send({
    message: "I'm alive",
    at: new Date().toISOString(),
  });
});

export default router;

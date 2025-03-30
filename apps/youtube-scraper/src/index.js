import express from "express";
import cors from "cors";
import router from "./routes.js";
import { redis } from "./utils/helpers.js";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use("/api/youtube", router);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    redis: redis.status === "ready" ? "connected" : "disconnected",
  });
});

app.listen(PORT, () => {
  console.log(`YouTube Scraper Service running on port ${PORT}`);
});

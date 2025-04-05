import express from "express";
import userRoute from "./routes/user.routes.js";
import googleSIgnIn from "./routes/googleAuth.routes.js";
import healthRoute from "./routes/health.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Express server :)");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", googleSIgnIn);
app.use("/api/v1/health", healthRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

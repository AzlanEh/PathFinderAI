import express from "express";
import userRoute from "./routes/user.routes";
import googleSIgnIn from "./routes/googleAuth.routes";
import healthRoute from "./routes/health.routes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express server :)");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", googleSIgnIn);
app.use("/api/v1/health", healthRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

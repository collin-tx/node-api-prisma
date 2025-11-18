import express from "express";

const app = express();

// middleware
app.use(express.json());

// routes
import router from "./routes/index.js";
app.use("/api", router);

export default app;

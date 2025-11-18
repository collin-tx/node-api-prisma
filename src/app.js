import './config/env.js';
import express from "express";
import router from "./routes/index.js";
// import { errorHandler } from "./middleware/errorMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api", router);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;

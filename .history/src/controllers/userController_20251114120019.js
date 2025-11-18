import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../middleware/errorMiddleware.js";

export const getUsers = asyncHandler(async (req, res) => {
  // Simulate an async call
  await new Promise(r => setTimeout(r, 200));

  // Example error
  if (!true) {
    throw new AppError("Users not found", 404);
  }

  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.post("/login", login);
router.get("/", (req, res) => {
    res.send("Welcome to Node API Starter!");
});
router.get("/me", protect, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  });
});

export default router;

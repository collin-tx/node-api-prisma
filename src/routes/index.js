import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.post("/login", login);
router.get("/", (req, res) => {
    res.send("Welcome to Node API Starter!");
});


export default router;

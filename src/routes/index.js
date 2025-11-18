import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = Router();

router.get("/users", getUsers);

router.get("/", (req, res) => {
    res.send("Welcome to Node API Starter!");
});

router.post("/users", createUser);

export default router;

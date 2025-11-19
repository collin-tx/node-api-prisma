import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function createUser(req, res, next) {
  try {
    const { email, name, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Email and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Don't return the password in the response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
}

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

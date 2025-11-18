import prisma from "../lib/prisma.js";

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res) {
  try {
    const { email, name } = req.body;

    const user = await prisma.user.create({
      data: { email, name },
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

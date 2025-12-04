import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../lib/ApiError.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError("Email and password are required", 422);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ApiError("Invalid email or password", 401);
    }

    const token = jwt.sign(
      // { id: user.id, email: user.email },
      { userId: user.id },
      process.env.JWT_SECRET,
      {
        // expiresIn: process.env.JWT_EXPIRES_IN,
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
      }
    );

    // res.json({ token });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    next(err);
  }
}

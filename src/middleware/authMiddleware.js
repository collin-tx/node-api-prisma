import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import ApiError from "../lib/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError("Not authorized, token missing", 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      throw new ApiError("Not authorized, user not found", 401);
    }

    req.user = user; // user available in next handlers
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      next(new ApiError("Invalid token", 401));
    } else if (err.name === "TokenExpiredError") {
      next(new ApiError("Token expired", 401));
    } else {
      next(err);
    }
  }
};

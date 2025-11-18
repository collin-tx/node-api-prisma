import dotenv from "dotenv";

dotenv.config(); // load .env

const requiredEnv = ["DATABASE_URL", "PORT"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1); // stop the app
  }
});

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 4000;

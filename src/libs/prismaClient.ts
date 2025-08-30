import { PrismaClient } from "@prisma/client";
import log from "../logger/log";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // Prisma logs
});

async function connectDB() {
  try {
    await prisma.$connect();
    log.info("✅ Database connected successfully!");
  } catch (error) {
    log.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

connectDB();

export default prisma;

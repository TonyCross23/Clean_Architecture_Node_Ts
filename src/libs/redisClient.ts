import { createClient } from "redis";
import log from "../logger/log";

const REDIS_URL = process.env.REDIS_URL || "redis";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

// Create Redis client
const redisClient = createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
    },
    // Do NOT use legacyMode here
});

// Event listeners
redisClient.on("connect", () => log.info("✅ Redis connected"));
redisClient.on("error", (err) => log.error("Redis error", err));

// Connect asynchronously
(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        log.error("Redis connect failed", err);
    }
})();

export default redisClient;

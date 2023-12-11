import {Redis} from "ioredis";

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log("Redis configuration successfully!");
        return process.env.REDIS_URL;
    }

    throw new Error("Redis configuration");
};

export const redis = new Redis(redisClient());

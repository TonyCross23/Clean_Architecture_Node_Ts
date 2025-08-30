import "reflect-metadata"
import express from 'express'
import morgan from "morgan";
import log from "./logger/log";
import router from "./router";
import { errorHandler } from "./middlewares/appError";
import redisClient from "./libs/redisClient";

const PORT = process.env.PORT || 6000;

const app = express();
app.use(express.json());
app.locals.redis = redisClient

app.use(morgan("dev", {
  stream: {
    write: (message: string) => log.info(message.trim())
  }
}));


app.use("/api/v1", router);

app.use(errorHandler)

app.listen(PORT, () => {
    log.info(`🚀 http://localhost:${PORT} \n` +
             `If you want to stop the server, press Ctrl + C`)
})
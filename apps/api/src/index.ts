import { createServer } from "node:http";
import { createApp } from "./app.js";
import { loadEnv } from "./env.js";
import { createSocketServer } from "./socket.js";

const env = loadEnv();
const httpServer = createServer();
const io = createSocketServer(httpServer, env);
const app = createApp(env, io);

httpServer.on("request", app);
httpServer.listen(env.PORT, env.HOST, () => {
  console.info(`takiia-api listening on ${env.HOST}:${env.PORT}`);
});

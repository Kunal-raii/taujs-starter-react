import path from "node:path";
import { fileURLToPath } from "node:url";

import Fastify from "fastify";
import { createServer } from "@taujs/server";

import config from "../taujs.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.resolve(__dirname, "../client");

const startServer = async () => {
  try {
    const fastify = Fastify();

    await createServer({
      fastify,
      config,
      clientRoot,
      debug: {
        ssr: process.env.NODE_ENV === "development",
      },
    });

    await fastify.listen({
      port: config.server?.port || 5173,
      host: config.server?.host || "localhost",
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

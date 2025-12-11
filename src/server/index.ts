import Fastify from "fastify";
import { createServer } from "@taujs/server";

import config from "../../taujs.config.js";

const isDev = process.env.NODE_ENV === "development";

const startServer = async () => {
  try {
    const fastify = Fastify();

    await createServer({
      fastify,
      config,
      debug: { ssr: isDev },
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

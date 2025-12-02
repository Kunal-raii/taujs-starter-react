import path from "node:path";
import { fileURLToPath } from "node:url";

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { createServer } from "@taujs/server";

import config from "../taujs.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV === "development";

const clientRoot = isDev
  ? path.resolve(__dirname, "../client") // source
  : path.resolve(__dirname, "../dist/client"); // build

const startServer = async () => {
  try {
    const fastify = Fastify();

    await createServer({
      fastify,
      config,
      clientRoot,
      staticAssets: isDev
        ? false
        : {
            plugin: fastifyStatic,
            options: {
              root: clientRoot,
              prefix: "/", // required: Vite asset URLs start with /
            },
          },
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

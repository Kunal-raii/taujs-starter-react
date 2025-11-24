import { defineConfig } from "@taujs/server/config";
import { pluginReact } from "@taujs/react/plugin";

export default defineConfig({
  server: {
    host: "localhost",
    port: 5173,
  },
  apps: [
    {
      appId: "main",
      entryPoint: "",
      plugins: [pluginReact()],
      routes: [
        {
          path: "/",
          attr: {
            render: "ssr",
            data: async () => ({
              message: "Hello from τjs!",
              timestamp: new Date().toISOString(),
            }),
          },
        },
      ],
    },
  ],
});

# τjs Template

A minimal template for building server-side rendered React applications with τjs (taujs).

https://taujs.dev/

## Features

- **Server-Side Rendering (SSR)** with React 19
- **Automatic Hydration** with @taujs/react
- **Fast Development** with Vite HMR
- **Type-Safe** with TypeScript
- **Easy Configuration** with taujs.config.ts
- **Fastify** for the runtime server

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173 to see your app running.

### 3. Build for Production

```bash
npm run build
```

### 4. Run Production Server

```bash
npm start
```

## Configuration

### taujs.config.ts

https://taujs.dev/reference/taujs-config/

The main configuration file for τjs. Here you define:

- **Server settings** (host, port)
- **Apps** (entry points for your applications)
- **Routes** (URL patterns with rendering strategies)

```typescript
export default defineConfig({
  server: {
    host: "localhost",
    port: 5173,
  },
  apps: [
    {
      appId: "main",
      entryPoint: "client",
      plugins: [pluginReact()],
      routes: [
        {
          path: "/",
          attr: {
            render: "ssr",
            data: async () => ({
              message: "Hello from τjs!",
            }),
          },
        },
      ],
    },
  ],
});
```

## Adding Routes

Add new routes in `taujs.config.ts`:

```typescript
routes: [
  {
    path: "/",
    attr: {
      render: "ssr",
      data: async () => ({ message: "Home" }),
    },
  },
  {
    path: "/about",
    attr: {
      render: "ssr",
      data: async () => ({ message: "About Us" }),
    },
  },
];
```

## Accessing Data in Components

Use the `useSSRStore` hook to access server-rendered data:

```typescript
import { useSSRStore } from "@taujs/react";

export function MyComponent() {
  const data = useSSRStore<{ message: string }>();

  return <h1>{data.message}</h1>;
}
```

## Rendering Modes

τjs supports two server rendering modes:

### SSR (Server-Side Rendering)

Complete HTML rendered on server, then hydrated on client.

```typescript
attr: {
  render: "ssr",
  data: async () => ({ /* data */ }),
}
```

### Streaming

Progressive HTML streaming with React 18+ suspense.

```typescript
attr: {
  render: "streaming",
  meta: { title: "Page Title" }, // required for streaming
  data: async () => ({ /* data */ }),
}
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:client` - Build client assets only
- `npm run build:server` - Build server bundle only
- `npm start` - Run production server

## Next Steps

1. **Add more routes** in `taujs.config.ts`
2. **Create services** for data fetching (see docs)
3. **Add authentication** middleware
4. **Configure CSP** (Content Security Policy)
5. **Set up microfrontends** for multi-app architecture

---

## Lockfile and `.gitignore`

This starter **does not** include a `package-lock.json`.
That’s intentional - leaving it out ensures that new projects always install the latest τjs versions on first install.

When you create a project from this template:

1. Run `npm install`
2. A fresh `package-lock.json` will be created for _your_ project
3. Commit it as normal in your own repo

The `.gitignore` in the starter excludes `package-lock.json` so the template itself doesn’t freeze versions. Remove this entry if you want to commit your lockfile!

## Updating τjs

τjs packages are set as 'latest' and don’t auto-update once your project has a lockfile.
To pull in the latest compatible versions:

```bash
npm update @taujs/react @taujs/server
```

If you want to jump to the newest published versions regardless of semver:

```bash
npm install @taujs/react@latest @taujs/server@latest
```

If things get messy or you want a full re-resolve:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Documentation

- [Getting Started](https://taujs.dev/guides/getting-started)
- [Data Loading](https://taujs.dev/guides/data-loading)
- [Services](https://taujs.dev/guides/services)
- [Configuration Reference](https://taujs.dev/reference/taujs-config)

## GitHub

- [@taujs/server](https://github.com/aoede3/taujs-server)
- [@taujs/react](https://github.com/aoede3/taujs-react)

## License

MIT

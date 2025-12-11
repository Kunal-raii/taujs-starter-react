import { useSSRStore } from "@taujs/react";

import config from "../../../taujs.config";

import "../styles/Hello.scss";

import type { RouteData } from "@taujs/server/config";

interface HelloProps {
  location?: string;
}

export function Hello({ location }: HelloProps) {
  const data = useSSRStore<RouteData<typeof config, "/">>();

  return (
    <div className="home-container">
      <h1 className="home-title">{data.message}</h1>

      <p className="home-subtitle">Welcome to your τjs application</p>

      <div className="home-info">
        <p>
          {Object.keys(data).length !== 0
            ? `Server-rendered at: ${new Date(data.timestamp).toLocaleString()}`
            : `Client-rendered at: ${new Date().toLocaleString()}`}
        </p>
        <p>
          Current location: <strong>{location}</strong>
        </p>
      </div>

      <div className="home-actions">
        <a
          href="https://taujs.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View Docs
        </a>

        <a
          href="https://github.com/aoede3/taujs-server"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          GitHub
        </a>
      </div>

      <p>
        Edit <code>src/client/components/hello.tsx</code> and save to test HMR
      </p>
    </div>
  );
}

import React from "react";

import { Hello } from "./components/Hello";

import "./styles/global.scss";

export function App({ location }: { location?: string }) {
  return (
    <React.StrictMode>
      <Hello location={location} />
    </React.StrictMode>
  );
}

import { createRenderer } from "@taujs/react";

import config from "../../../taujs.config";
import { App } from "./App";

import type { RouteContext } from "@taujs/server/config";

export const { renderSSR, renderStream } = createRenderer<
  Record<string, unknown>,
  RouteContext<typeof config>
>({
  appComponent: ({ location }) => <App location={location} />,
  headContent: ({ data, meta, routeContext }) => `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A simple τjs template application">
    <title>${data?.message || "τjs Template"}</title>
    <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
  `,
  enableDebug: process.env.NODE_ENV === "development",
});

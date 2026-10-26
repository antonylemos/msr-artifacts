import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ZephyrRsbuildPlugin } from "zephyr-rsbuild-plugin";
import { mfConfig } from "./module-federation.config";

export default defineConfig({
  server: {
    port: 3001,
  },
  output: {
    distPath: {
      root: "dist",
      js: "static/js",
      css: "static/css",
      html: "",
      image: "static/images",
      media: "static/media",
      font: "static/fonts",
    },
    cleanDistPath: true,
  },
  plugins: [
    pluginReact({
      splitChunks: {
        react: false,
        router: false,
      },
    }),
    ZephyrRsbuildPlugin(),
  ],
  moduleFederation: {
    options: mfConfig,
  },
});

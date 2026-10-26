import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from "vite-plugin-single-spa";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // '@paok/common-lib-webpack': '@myapp/common-lib-webpack',
      "@myapp/common-lib-webpack": "@paok/common-lib-webpack",
    },
  },
  build: {
    cssCodeSplit: false, // Split CSS into separate files
    rollupOptions: {
      external: [
        "styleguide",
        "@paok/common-lib-webpack",
        "react",
        "react-dom",
        "react-dom/client",
      ],
      output: {
        format: "system",
        assetFileNames: "assets/[name]-[hash][extname]", // Save CSS separately
        globals: {
          "@paok/common-lib-webpack": "@myapp/common-lib-webpack",
          styleguide: "styleguide",
        },
      },
    },
  },
  base: "./",
  plugins: [
    react(),
    vitePluginSingleSpa({
      type: "mife",
      serverPort: 3001,
      spaEntryPoints: ["src/spa.tsx"],
    }),
    cssInjectedByJsPlugin({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      injectCodeFunction: (cssCode: string, options: any) => {
        try {
          if (typeof document != "undefined") {
            const elementStyle = document.createElement("style");
            elementStyle.setAttribute("paok", "true");

            // SET ALL ATTRIBUTES
            for (const attribute in options.attributes) {
              elementStyle.setAttribute(
                attribute,
                options.attributes[attribute]
              );
            }

            elementStyle.appendChild(document.createTextNode(`${cssCode}`));
            document.head.appendChild(elementStyle);
          }
        } catch (e) {
          console.error("vite-plugin-css-injected-by-js", e);
        }
      },
    }),
  ],
});

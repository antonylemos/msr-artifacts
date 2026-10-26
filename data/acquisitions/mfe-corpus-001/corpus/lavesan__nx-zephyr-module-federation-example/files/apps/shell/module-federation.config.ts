import { dependencies } from "./package.json";
import type { ModuleFederationConfig } from "@rsbuild/core";

const { NODE_ENV, VITE_COURSES_URL, VITE_PROFILE_URL } = process.env;
const isDev = NODE_ENV === "development";

const COURSES_URL = isDev
  ? "http://localhost:3001"
  : VITE_COURSES_URL ||
    "https://nx-zephyr-module-federation-example-courses.vercel.app";

const PROFILE_URL = isDev
  ? "http://localhost:3002"
  : VITE_PROFILE_URL ||
    "https://nx-zephyr-module-federation-example-profile.vercel.app";

export const mfConfig: ModuleFederationConfig["options"] = {
  name: "shell",
  filename: "remoteEntry.js",
  remotes: {
    courses: `courses@${COURSES_URL}/remoteEntry.js`,
    profile: `profile@${PROFILE_URL}/remoteEntry.js`,
  },
  exposes: {},
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      eager: true,
      requiredVersion: dependencies.react,
    },
    "react-dom": {
      singleton: true,
      eager: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};

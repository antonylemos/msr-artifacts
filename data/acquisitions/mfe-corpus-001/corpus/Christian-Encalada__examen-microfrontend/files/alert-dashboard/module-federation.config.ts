export const mfConfig = {
  name: "AlertDashboard",
  filename: "remoteEntry.js",
  exposes: {
    "./AlertDashboard": "./src/components/AlertDashboard.tsx",
  },
  shared: ["react", "react-dom"],
};

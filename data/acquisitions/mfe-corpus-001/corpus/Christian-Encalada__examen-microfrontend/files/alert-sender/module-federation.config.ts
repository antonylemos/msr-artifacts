export const mfConfig = {
  name: "AlertSender",
  filename: "remoteEntry.js",
  exposes: {
    "./AlertSender": "./src/components/AlertSender.tsx",
  },
  shared: ["react", "react-dom"],
};

export const mfConfig = {
  name: "appclases",
  exposes: {},
  shared: ["react", "react-dom"],
  remotes: {
    AlertSender: "AlertSender@http://localhost:3001/remoteEntry.js",
    AlertDashboard: "AlertDashboard@http://localhost:3002/remoteEntry.js",
  },
};

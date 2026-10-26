import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@org1/react-app",
  app: () => System.import("@org1/react-app"),
  activeWhen: ["/react"],
});

registerApplication({
  name: "angular-app",
  app: () => System.import("angular-app"),
  activeWhen: ["/angular"],
});

registerApplication({
  name: "react-vite-app",
  app: () => System.import("react-vite-app"),
  activeWhen: ["/react-vite"],
});

start({
  urlRerouteOnly: true,
});

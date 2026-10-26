export const mfConfig = {
  name: "MF_Characters",
  filename: "remoteEntry.js",
  exposes: {
    "./Vista": "./src/components/vista.tsx",
  },
  shared: ["react", "react-dom"],
};

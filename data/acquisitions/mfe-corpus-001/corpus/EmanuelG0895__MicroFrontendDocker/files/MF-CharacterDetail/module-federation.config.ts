export const mfConfig = {
  name: "MF_CharacterDetail",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./CharacterInfo": "./src/components/view.tsx",
    "./View": "./src/components/view.tsx",
  },
  shared: ["react", "react-dom"],
};

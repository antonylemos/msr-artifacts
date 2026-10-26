export const mfConfig = {
  name: "MF_Shell",
  remotes: {
    MF_CharacterDetail: "MF_CharacterDetail@http://localhost:3003/remoteEntry.js",
    MF_Characters: "MF_Characters@http://localhost:3002/remoteEntry.js",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    "shared-hooks": { singleton: true, requiredVersion: "*" },
  },
};

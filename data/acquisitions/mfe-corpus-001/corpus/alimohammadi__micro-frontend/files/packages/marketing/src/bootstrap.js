import React from "react";
import ReactDom from "react-dom";
import App from "./App";

// Mount function to start up the app
const mount = (el) => {
  ReactDom.render(<App />, el);
};
// if we are in development mode and in isolation call mount imediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) mount(devRoot);
}

// We are running through container and we should export the mount function
export { mount };

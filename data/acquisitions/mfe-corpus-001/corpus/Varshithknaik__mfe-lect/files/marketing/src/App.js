import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { Route, Router, Routes } from "react-router-dom";
import Pricing from "./components/Pricing";
import Landing from "./components/Landing";
import { useState, useEffect } from "react";

export default ({ history }) => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });

    return unlisten;
  }, [history]);

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Router location={location} navigator={history}>
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
};

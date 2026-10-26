import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import SalesPortal from "./components/SalesPortal";
import UnderwriterPortal from "./components/UnderwriterPortal";
import ProductConfig from "./components/ProductConfig";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sales/*" element={<SalesPortal />} />
        <Route path="/underwriter/*" element={<UnderwriterPortal />} />
        <Route path="/products/*" element={<ProductConfig />} />
      </Routes>
    </Layout>
  );
}

export default App;

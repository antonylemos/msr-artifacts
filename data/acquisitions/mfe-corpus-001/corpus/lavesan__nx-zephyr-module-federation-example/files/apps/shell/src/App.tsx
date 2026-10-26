import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";

// Lazy load the remote modules
const Courses = lazy(() => import("courses/App"));
const Profile = lazy(() => import("profile/App"));

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Header />
        <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/courses" replace />} />
              <Route path="/courses*" element={<Courses />} />
              <Route path="/profile*" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

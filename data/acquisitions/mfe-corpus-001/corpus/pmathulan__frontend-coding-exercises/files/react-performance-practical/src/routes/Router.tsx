import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import HomePage from "../pages/HomePage";
import CustomHookPage from "../pages/CustomHookPage";
import VirtualListPage from "../pages/VirtualListPage";
import MainLayout from "../shared/Layout/MainLayout";
import ErrorBoundaryPage from "../components/ErrorBoundaryPage";

const AppRouter = () => {
  return (
    <Router>
      {}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom-hook" element={<CustomHookPage />} />
          <Route path="/virtual-list" element={<VirtualListPage />} />
          <Route path="/hoc" element={<ErrorBoundaryPage />} />
        </Route>

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Buyer = React.lazy(() => import("buyer_app/App"));
const Seller = React.lazy(() => import("seller_app/App"));
const Admin = React.lazy(() => import("admin_app/App"));
const Payment = React.lazy(() => import("payment_app/App"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Buyer />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

import { Outlet } from "react-router";
import Header from "./Header";
import { Footer } from "./Footer";
import { useState } from "react";

const Layout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header search={search} setSearch={setSearch} />
      <main className="flex-1">
        <Outlet context={{ search, setSearch }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

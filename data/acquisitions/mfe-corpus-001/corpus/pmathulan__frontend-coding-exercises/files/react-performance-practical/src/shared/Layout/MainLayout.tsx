import { Outlet } from "react-router";
import NavBar from "./NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="pt-16">
        {" "}
        {/* Push content below fixed navbar */}
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

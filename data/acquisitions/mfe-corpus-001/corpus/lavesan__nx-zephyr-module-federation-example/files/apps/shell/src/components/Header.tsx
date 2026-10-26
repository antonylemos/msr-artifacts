import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header style={{ backgroundColor: "#333", padding: "1rem" }}>
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link
          to="/courses"
          style={{
            color: location.pathname.startsWith("/courses") ? "#fff" : "#ccc",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            backgroundColor: location.pathname.startsWith("/courses")
              ? "#444"
              : "transparent",
          }}
        >
          Courses
        </Link>
        <Link
          to="/profile"
          style={{
            color: location.pathname.startsWith("/profile") ? "#fff" : "#ccc",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            backgroundColor: location.pathname.startsWith("/profile")
              ? "#444"
              : "transparent",
          }}
        >
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;

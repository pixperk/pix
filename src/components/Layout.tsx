
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Smooth scroll to sections when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // Small timeout to ensure DOM is ready
      }
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen font-serif">
      <ParticlesBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

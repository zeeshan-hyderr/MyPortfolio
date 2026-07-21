import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import api from "./api/axios";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/admin/DashboardLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageCertifications from "./pages/admin/ManageCertifications";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageAbout from "./pages/admin/ManageAbout";
import ManageContact from "./pages/admin/ManageContact";
import Messages from "./pages/admin/Messages";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.get("/contact/info").then((res) => setContact(res.data)).catch(() => {});
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#131826", color: "#E5E7EB", border: "1px solid #1F2937" },
        }}
      />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="certifications" element={<ManageCertifications />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="about" element={<ManageAbout />} />
          <Route path="contact" element={<ManageContact />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer contact={contact} />}
      {!isAdminRoute && <ScrollToTopButton />}
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import SideBar from "./components/Sidebar";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/Profil/" element={<Home />} />
        <Route path="/Réglage" element={<Home />} />
        <Route path="/Communauté" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;

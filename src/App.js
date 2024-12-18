import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./Pages/Public/Index";
import Auth from "./Pages/Auth/Index";
import Dashboard from "./Pages/Dashboard/Index";

export default function App() {
  const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location]);

    return null;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/*" element={<Index />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

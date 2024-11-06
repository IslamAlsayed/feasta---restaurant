import "./GoTop.css";
import React, { useState, useEffect } from "react";

export default function GoTop() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="GoTop">
      {showButton && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <i className="fas fa-angle-up"></i>
        </button>
      )}
    </div>
  );
}

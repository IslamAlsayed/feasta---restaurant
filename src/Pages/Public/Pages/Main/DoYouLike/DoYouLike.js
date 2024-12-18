import { Link } from "react-router-dom";
import "./DoYouLike.css";
import React from "react";

export default function DoYouLike() {
  return (
    <div className="DoYouLike">
      <div className="container">
        <div className="title">
          <h2>
            <span>do you like</span> feasta food
          </h2>
          <div className="description">
            stay updated with the latest new dishes on menu, special offers and
            restaurant's events!
          </div>
        </div>
        <div className="actions">
          <Link to="/contact-us" className="btn btnActive">
            contact us
          </Link>
          <Link to="/all-recipes" className="btn btnActive">
            see our menu
          </Link>
        </div>
      </div>
    </div>
  );
}

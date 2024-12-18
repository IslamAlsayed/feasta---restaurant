import { Link } from "react-router-dom";
import "./TastyFood.css";
import React from "react";

export default function TastyFood() {
  return (
    <div className="TastyFood">
      <div className="container">
        <div className="tasty-food">
          <h2>
            do you <span>like tasty food?</span>
          </h2>
          <p>
            stay updated with the latest new dishes on our menu, spacial offers
            and restaurant's events!
          </p>
          <div className="routes">
            <Link to="/contact-us" className="btn btnActive">
              contact us
            </Link>
            <Link to="/all-recipes" className="btn btnActive">
              see our menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

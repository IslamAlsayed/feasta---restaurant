import "./WeDo.css";
import React from "react";
import { Link } from "react-router-dom";
import Chef from "../../../../../Assets/images/chefs/chef2.png";

export default function WeDo() {
  return (
    <div className="WeDo">
      <div className="container">
        <h2>
          what we <span>do</span>
        </h2>
        <div className="we-do">
          <div className="info">
            <p className="description">
              We are on the Gas Safe Register and are members of the Institute
              of Plumbing and Heating Engineering.
            </p>
            <p className="description">
              Everyone realizes why a new common language would be desirable:
              one could refuse to pay expensive translators To achieve this, it
              would be necessary to have uniform grammar, pronunciation and more
              common words...
            </p>
            <div className="our-menu">
              <Link to="/all-recipes" className="btn btnActive">
                view our menu
              </Link>
            </div>
          </div>

          <div className="img">
            <img src={Chef} alt="chef" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

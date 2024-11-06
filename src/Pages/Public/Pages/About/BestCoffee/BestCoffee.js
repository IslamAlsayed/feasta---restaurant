import "./BestCoffee.css";
import React from "react";
import beans from "../../../../../Assets/images/other/beans.png";
import coffeeMan from "../../../../../Assets/images/other/coffeeMan.jpg";

export default function BestCoffee() {
  return (
    <div className="BestCoffee">
      <div className="container">
        <div className="best-coffee">
          <div className="date">
            <h2>opening time</h2>
            <p>monday - sunday</p>
            <p>09:00AM - 10:00PM</p>

            <div className="contact">
              <button className="btn btnActive">0106543133</button>
              <button className="btn btnActive">www.fixion.com</button>
            </div>
          </div>

          <div className="img">
            <img src={coffeeMan} alt="ads coffee man" loading="lazy" />
          </div>

          <div className="info">
            <h3>
              try the <span>best coffee</span> in the city
            </h3>
            <p>
              We are on the Gas Safe Register and are members of the Institute
              of Plumbing and Heating Engineering.
            </p>
            <p>
              Everyone realizes why a new common language would be desirable:
              one could refuse to pay expensive translators To achieve this, it
              would be necessary to have uniform grammar, pronunciation and more
              common words...
            </p>

            <img src={beans} alt="beans coffee" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

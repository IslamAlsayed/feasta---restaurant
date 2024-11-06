import "./EatBetter.css";
import React from "react";
import coffeeBean from "../../../../../Assets/images/other/coffee-bean.png";
import cupFruit from "../../../../../Assets/images/other/cup-fruit.png";
import { Link } from "react-router-dom";

export default function EatBetter() {
  return (
    <div className="EatBetter">
      <div className="container">
        <div className="eat-better">
          <div className="img">
            <img src={coffeeBean} alt="coffee beans" loading="lazy" />
          </div>

          <div className="info">
            <h2>eat healthy think better</h2>
            <p>enjoy the day</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h3>reservation by phone</h3>
            <i className="fas fa-phone"></i>
            <p className="description">
              everyone realizes why a new common language would be and
              desirable: one could refuse toexpensive translators to achtiev
              this necessary have pronunciation
            </p>
            <p>free call</p>

            <Link to="tel:+201065438133">
              <i className="fas fa-phone"></i>
              (+20) 1065438133
            </Link>
          </div>

          <div className="col">
            <div className="img">
              <img src={cupFruit} alt="fruit cup" loading="lazy" />
            </div>
          </div>

          <div className="col">
            <h3>reservation by phone</h3>
            <i className="fas fa-phone"></i>
            <p className="description">
              everyone realizes why a new common language would be and
              desirable: one could refuse toexpensive translators to achtiev
              this necessary have pronunciation
            </p>
            <p>free call</p>
            <Link to="/contact-us">
              <i className="fas fa-envelope"></i>
              contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

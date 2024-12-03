import "./Resewation.css";
import React from "react";
import { Link } from "react-router-dom";
import Pizza from "../../../../../Assets/images/other/index2/pizza3.png";
import FoodDelivery from "../../../../../Assets/images/icons/main-colors/food-delivery1.png";
import Daily from "../../../../../Assets/images/icons/main-colors/daily.png";
import CallCenter from "../../../../../Assets/images/icons/main-colors/call-center.png";
import Catering from "../../../../../Assets/images/icons/main-colors/catering.png";

export default function Resewation() {
  return (
    <div className="MainResewation">
      <div className="container">
        <div className="action">
          <Link to="/all-recipes" className="btn btnActive">
            see our menu
          </Link>
        </div>

        <div className="resewation">
          <div className="resewation-info">
            <div className="title">
              <h2>
                welcome to the <span>feasta</span>
                <img src={Pizza} alt="pizza crash" loading="lazy" />
              </h2>
              <div className="description">
                we are on the gas safe register and are members of the institute
                of plumbing and heading engineering
              </div>
            </div>

            <div className="cards">
              <div className="card">
                <div className="card-img">
                  <img src={FoodDelivery} alt="delivery food" loading="lazy" />
                </div>
                <div className="card-info">
                  <h3>free delivery</h3>
                  <small>during 45 min</small>
                  <p>
                    Members of the Institute of Plumbing and Heating
                    Engineering. Semantics, a large language ocean.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-img">
                  <img src={Daily} alt="freshly cooked" loading="lazy" />
                </div>
                <div className="card-info">
                  <h3>Freshly Cooked</h3>
                  <small>hot food</small>
                  <p>
                    If several languages coalesce, the grammar of the resulting
                    language is more simple and regular.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-img">
                  <img
                    src={CallCenter}
                    alt="call center: 24 hours support"
                    loading="lazy"
                  />
                </div>
                <div className="card-info">
                  <h4>24 Hours Support</h4>
                  <small>Food Delivery</small>
                  <p>
                    To achieve this, it would be necessary to have uniform
                    grammar, pronunciation and more common words...
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-img">
                  <img
                    src={Catering}
                    alt="catering: chef experience"
                    loading="lazy"
                  />
                </div>
                <div className="card-info">
                  <h3>Chef Experience</h3>
                  <small>Our Chef's</small>
                  <p>
                    Everyone realizes why a new common language would be
                    desirable: one could refuse to pay expensive translators...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="resewation-form" id="resewation-form">
            <div className="title">
              <span>
                make online <b>resewation</b>
              </span>
              <p>submit information to place order</p>
            </div>

            <div className="form">
              <form action="">
                <div className="group">
                  <input type="text" placeholder="your name*" />
                </div>
                <div className="group">
                  <input type="email" placeholder="your email*" />
                </div>
                <div className="group">
                  <input type="number" placeholder="phone number*" />
                </div>
                <div className="group">
                  <select name="" id="">
                    <option value="0">table for</option>
                    <option value="1">table 1</option>
                    <option value="2">table 2</option>
                    <option value="3">table 3</option>
                  </select>
                </div>
                <div className="group">
                  <select name="" id="">
                    <option value="0">occasion</option>
                    <option value="1">table 1</option>
                    <option value="2">table 2</option>
                    <option value="3">table 3</option>
                  </select>
                </div>
                <div className="group time-date">
                  <select name="" id="">
                    <option value="0">time</option>
                    <option value="1">table 1</option>
                    <option value="2">table 2</option>
                    <option value="3">table 3</option>
                  </select>
                </div>
                <div className="group">
                  <input type="date" placeholder="date" />
                </div>
                <div className="group textarea">
                  <textarea placeholder="your message"></textarea>
                </div>
                <button className="btn btnActive">submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./Resewation.css";
import React from "react";
import ImageResewation from "../../../../../Assets/images/other/index1/resewation.png";

export default function Resewation() {
  return (
    <div className="AppResewation">
      <div className="container">
        <div className="resewation-img">
          <div className="box-img">
            <img src={ImageResewation} alt="form resewation" />
          </div>
        </div>

        <div className="resewation-form">
          <div className="summery">
            <p>
              <span>feasta</span> online booking
            </p>
            <p>
              make online <span>resewation</span>
            </p>
          </div>

          <div className="form">
            <form action="">
              <div className="group">
                <input type="text" placeholder="name" />
              </div>

              <div className="group">
                <input type="text" placeholder="email id" />
              </div>

              <div className="group">
                <input type="text" placeholder="Number of people" />
              </div>

              <div className="group">
                <input type="date" />
              </div>

              <div className="group">
                <select defaultValue="0">
                  <option value="0" disabled>
                    Time
                  </option>
                  <option value="1">breakfast</option>
                  <option value="2">lunch</option>
                  <option value="3">dinner</option>
                </select>
              </div>

              <div className="group">
                <input type="number" placeholder="phone number" />
              </div>

              <div className="group">
                <button className="btn btnActive">book a table</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./Subscribe.css";
import React from "react";

export default function Subscribe() {
  return (
    <div className="AppSubscribe">
      <div className="container">
        <div className="subscribe">
          <div className="info">
            <h2>subscribe to get touch</h2>
            <div className="description">
              connecting ideas and people, how take can change our lives
            </div>
          </div>

          <div className="form">
            <form action="">
              <input type="email" placeholder="Enter your email" />
              <button className="btn btnActive">subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

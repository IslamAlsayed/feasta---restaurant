import "./Banner.css";
import React from "react";
import ArrowsDown from "../../../../../Components/ArrowsDown/ArrowsDown";

export default function Banner() {
  return (
    <div className="Banner">
      <div className="container">
        <div className="menu">
          <div className="info">
            <h2>book table</h2>
            <p>crafted dishes sourced best ingredients</p>
          </div>

          <div className="box-border">
            <div className="top"></div>
            <div className="right"></div>
            <div className="bottom"></div>
            <div className="left"></div>
          </div>
        </div>

        <ArrowsDown />
      </div>
    </div>
  );
}

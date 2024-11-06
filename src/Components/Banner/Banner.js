import "./Banner.css";
import React from "react";

export default function Banner({ title, description }) {
  return (
    <div className="Banner">
      <div className="container">
        <div className="menu">
          <div className="info">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <div className="box-border">
            <div className="top"></div>
            <div className="right"></div>
            <div className="bottom"></div>
            <div className="left"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

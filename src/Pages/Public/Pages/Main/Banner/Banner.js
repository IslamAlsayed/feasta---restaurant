import "./Banner.css";
import React from "react";
import ArrowsDown from "../../../../../Components/ArrowsDown/ArrowsDown";

export default function Banner() {
  return (
    <div className="MainHome">
      <div className="container">
        <div className="home-screen">
          <div className="content-text">
            <div className="info">
              <span>welcome to</span>
              <p>
                <span>feasta egyptian</span> restaurant
              </p>
            </div>
          </div>
        </div>

        <ArrowsDown />
      </div>
    </div>
  );
}

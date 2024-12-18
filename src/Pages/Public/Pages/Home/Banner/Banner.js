import "./Banner.css";
import React from "react";
import ArrowsDown from "../../../../../Components/ArrowsDown/ArrowsDown";

export default function Banner() {
  return (
    <div className="HomeBanner">
      <div className="container">
        <div className="home-screen">
          <div className="content-text">
            <p>
              <span>welcome</span> <span>to</span>
            </p>
            <h2>
              <span>feasta egyptian</span> restaurant
            </h2>
            <p>
              we are on the gas safe register and <br />
              are members of the institute.
            </p>
          </div>

          <div className="box-border">
            <div className="top-right-corner"></div>
            <div className="top-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="bottom-left-corner"></div>
          </div>
        </div>

        <ArrowsDown />
      </div>
    </div>
  );
}

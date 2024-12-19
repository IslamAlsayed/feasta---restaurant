import "./Banner.css";
import React from "react";
import ArrowsDown from "../../../../../Components/ArrowsDown/ArrowsDown";
import { SITE_HELPER } from "../../../../../Store/helper";

export default function Banner() {
  const siteNameParts = SITE_HELPER.site_name.split(' ');

  return (
    <div className="MainHome">
      <div className="container">
        <div className="home-screen">
          <div className="content-text">
            <div className="info">
              <span>welcome to</span>
              <p><span>{siteNameParts[0] + ' ' + siteNameParts[1]}</span> {siteNameParts[2]}</p>
            </div>
          </div>
        </div>

        <ArrowsDown />
      </div>
    </div>
  );
}

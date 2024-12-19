import "./Banner.css";
import React from "react";
import ArrowsDown from "../../../../../Components/ArrowsDown/ArrowsDown";
import { SITE_HELPER } from "../../../../../Store/helper";

export default function Banner() {
  const siteNameParts = SITE_HELPER.site_name.split(' ');

  return (
    <div className="HomeBanner">
      <div className="container">
        <div className="home-screen">
          <div className="content-text">
            <p><span>welcome</span> <span>to</span></p>
            <h2><span>{siteNameParts[0] + ' ' + siteNameParts[1]}</span> {siteNameParts[2]}</h2>
            <p>we are on the gas safe register and <br /> are members of the institute.</p>
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

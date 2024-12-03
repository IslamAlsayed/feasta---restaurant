import "./Discount.css";
import React from "react";
import Bibimbap from "../../../../../Assets/images/logos/bibimbap.png";

export default function Discount() {
  return (
    <div className="DiscountBannner">
      <div className="box-voucher">
        <div className="content-voucher">
          <div className="logo">
            <img src={Bibimbap} alt="site logo" loading="lazy" />
            <div className="logo-title">
              <span>feasta</span>
              <span>egyptian restaurant</span>
            </div>
          </div>

          <div className="discount">
            special discount <br />
            <span>40%</span> off
          </div>

          <div className="voucher">
            <h2>gift voucher</h2>
            <p>
              a wonderful sere has take possession of my entire soul, like these
              sweet mornings of spring which I enjoy with my whole I am feel
              exist created.
            </p>
          </div>

          <div className="social">
            <i className="fa-brands fa-facebook facebook"></i>
            <i className="fa-brands fa-twitter twitter"></i>
            <i className="fa-brands fa-google-plus-g google"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";
import bibimbap from "../../Assets/images/logos/bibimbap.png";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="container">
        <Link to="/" className="logo">
          <div className="logo-img">
            <img src={bibimbap} alt="site logo" loading="lazy" />
          </div>
          <div className="logo-title">
            <span>feasta</span>
            <span>egyptian restaurant</span>
          </div>
        </Link>

        <div className="description">
          A collection of textile samples lay spread out on the table - Samba
          was a traveling salesman - and above it there hung a picture that he
          had recently cut out of an illustrated magazine and housed in a nice,
          gilded frame.
        </div>

        <div className="social">
          <div className="address">
            <div>
              13 Al-Masakin Street, Al-Asadiya Village, Abu Hammad Center,
              Sharqia Governorate 14466
            </div>

            <Link to={"mailto:support@feastaegyptianRestaurant.com"}>
              support@feastaegyptianRestaurant.com
            </Link>

            <Link to={"tel:+204864536465"}>(+20) 4864536465</Link>
          </div>

          <div className="icons">
            <div>
              <i className="fa-brands fa-facebook facebook"></i>
            </div>
            <div>
              <i className="fa-brands fa-twitter twitter"></i>
            </div>
            <div>
              <i className="fa-brands fa-google-plus-g google"></i>
            </div>
          </div>
        </div>

        <div className="foot">
          <div className="support">
            <div>Terms of use</div>
            <div>Privacy Policy</div>
            <div>SiteMap</div>
            <div>Contact</div>
          </div>

          <div className="copyRight">
            © 2023 <span>feasta restaurant</span> all right reserved The
            developer is <span>islamAlsayed</span> 01065438133 but
            <span className="quote"> the design is quoted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

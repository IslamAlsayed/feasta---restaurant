import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";
import { SITE_HELPER } from "../../Store/helper";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="container">
        <Link to="/" className="logo">
          <div className="logo-img">
            <img src={SITE_HELPER.logo} alt={SITE_HELPER.site_name} loading="lazy" />
          </div>
          <div className="logo-title">
            <span>{SITE_HELPER.site_name?.split(' ')[0]}</span>
            <span>{SITE_HELPER.site_name?.split(' ').slice(1).join(' ')}</span>
          </div>
        </Link>

        <div className="description">{SITE_HELPER.about_us}</div>

        <div className="social">
          <div className="address">
            <div>{SITE_HELPER.address}</div>
            <Link to={`mailto:${SITE_HELPER.email}`}>{SITE_HELPER.email}</Link>
            <Link to={`tel:${SITE_HELPER.phone}`}>{SITE_HELPER.phone}</Link>
          </div>

          <div className="icons">
            <div><i className="fa-brands fa-facebook facebook"></i></div>
            <div><i className="fa-brands fa-twitter twitter"></i></div>
            <div><i className="fa-brands fa-google-plus-g google"></i></div>
          </div>
        </div>

        <div className="foot">
          <div className="support">
            <Link to="/terms-of-use">terms of use</Link>
            <Link to="/privacy-policy">privacy policy</Link>
            <Link to="/contact">contact</Link>
            <Link to="/support">support</Link>
          </div>

          <div className="copyRight">
            <p>© 2023 <span>feasta restaurant</span> all right reserved The developer is
              <Link to={`mailto: ${JSON.parse(SITE_HELPER.developer)?.email}`}>{JSON.parse(SITE_HELPER.developer)?.name}</Link></p>

            <p><Link to={`tel:${JSON.parse(SITE_HELPER.developer)?.phone}`}>{JSON.parse(SITE_HELPER.developer)?.phone}</Link> but
              <span className="quote"> the design is quoted</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

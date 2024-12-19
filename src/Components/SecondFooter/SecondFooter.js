import "./SecondFooter.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bibimbap from "../../Assets/images/logos/bibimbap.png";
import dish6 from "../../Assets/images/dishes/dish6.jpg";
import dish4 from "../../Assets/images/dishes/dish4.jpg";
import dish10 from "../../Assets/images/dishes/dish10.jpg";
import dish11 from "../../Assets/images/dishes/dish11.jpg";
import dish13 from "../../Assets/images/dishes/dish13.jpg";
import dish15_1 from "../../Assets/images/dishes/dish15.jpg";
import dish15_2 from "../../Assets/images/dishes/dish15.jpg";
import dish15_3 from "../../Assets/images/dishes/dish15.jpg";
import dish15_4 from "../../Assets/images/dishes/dish15.jpg";
import { SITE_HELPER } from "../../Store/helper";

export default function SecondFooter() {
  const [image, setImage] = useState();

  return (
    <div className="SecondFooter">
      <div className="container">
        <div className="title">
          <Link to="/" className="logo">
            <div className="logo-img">
              <img className="logoImg" src={SITE_HELPER.logo} alt={SITE_HELPER.site_name} />
            </div>
            <div className="logo-title">
              <span>{SITE_HELPER.site_name?.split(' ')[0]}</span>
              <span>{SITE_HELPER.site_name?.split(' ').slice(1).join(' ')}</span>
            </div>
          </Link>

          <div className="description">{SITE_HELPER.about_us}</div>
        </div>

        <div className="contact">
          <div className="row">
            <div className="side">
              <div className="col about">
                <h3>about us</h3>
                <div className="description">{SITE_HELPER.about_us}</div>
              </div>

              <div className="col contact">
                <h3>contact details</h3>
                <ul>
                  <li>
                    <i className="fas fa-location-dot"></i>
                    <div>{SITE_HELPER.address}</div>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <Link to={`mailto:${SITE_HELPER.email}`}>{SITE_HELPER.email}</Link>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>
                    <Link to={`tel:${SITE_HELPER.phone}`}>{SITE_HELPER.phone}</Link>
                  </li>
                </ul>
              </div>

              <div className="col work">
                <h3>working hours</h3>
                <p>{SITE_HELPER.address}</p>
                {/* <p>Every day from <b>10am</b> to <b>8pm</b>, sunday is <span className="closed">closed</span></p> */}
              </div>
            </div>

            <div className="side">
              <div className="col gallery">
                <h3>gallery</h3>

                <ul>
                  {[dish6, dish4, dish10, dish11, dish13, dish15_1, dish15_2, dish15_3, dish15_4,].map((image, index) => (
                    <li key={index} className="btnActive" onClick={() => setTimeout(() => setImage(image), 250)} >
                      <img src={image} alt="main dish" loading="lazy" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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

      {image && (
        <div className="image" id="image">
          <div className="content">
            <i className="fas fa-xmark btnActive" onClick={() => setTimeout(() => setImage(), 250)}></i>
            <img src={image} id="img" alt="full size dish" loading="lazy" />
          </div>
        </div>
      )}
    </div>
  );
}

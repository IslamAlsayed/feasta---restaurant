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

export default function SecondFooter() {
  const [image, setImage] = useState();

  return (
    <div className="SecondFooter">
      <div className="container">
        <div className="title">
          <Link to="/" className="logo">
            <div className="logo-img">
              <img className="logoImg" src={bibimbap} alt="logo" />
            </div>
            <div className="logo-title">
              <span>feasta</span>
              <span>egyptian restaurant</span>
            </div>
          </Link>

          <div className="description">
            To achieve this, it would be necessary to have uniform grammar,
            pronunciation and more common words. I should be incapable of
            drawing a single stroke at the present moment; and yet I feel that I
            never was a greater artist than now.
          </div>
        </div>

        <div className="contact">
          <div className="row">
            <div className="col about">
              <h3>about us</h3>
              <div className="description">
                To achieve this, it would be necessary to have uniform grammar,
                pronunciation and more if a common words When, while the lovely
                valley teems with Tuesday Wednesday Thursday
              </div>
            </div>

            <div className="col work">
              <h3>working hours</h3>

              <p>
                Every day from <b>10 am</b> to <b>8 pm</b>
              </p>

              <ul>
                <li>
                  <span>monday</span>
                  <span>10.00am - 18.00pm</span>
                </li>
                <li>
                  <span>tuesday</span>
                  <span>10.00am - 18.00pm</span>
                </li>
                <li>
                  <span>wednesday</span>
                  <span>10.00am - 18.00pm</span>
                </li>
                <li>
                  <span>thursday</span>
                  <span>10.00am - 18.00pm</span>
                </li>
                <li>
                  <span>friday</span>
                  <span>10.00am - 18.00pm</span>
                </li>
                <li>
                  <span>saturday</span>
                  <span>10.00am - 18.00pm</span>
                </li>
                <li>
                  <span>sunday</span>
                  <span className="closed">closed</span>
                </li>
              </ul>
            </div>

            <div className="col contact">
              <h3>contact details</h3>
              <ul>
                <li>
                  <i className="fas fa-location-dot"></i>
                  <div>
                    13 Al-Masaken Street, Port Al-Asadiya Abu Hammad, Sharqia
                    14466
                  </div>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <div>(+20) 6549845645</div>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <div>info@feastaegyptianRestaurant.com</div>
                </li>
              </ul>
            </div>

            <div className="col gallery">
              <h3>gallery</h3>

              <ul>
                {[
                  dish6,
                  dish4,
                  dish10,
                  dish11,
                  dish13,
                  dish15_1,
                  dish15_2,
                  dish15_3,
                  dish15_4,
                ].map((image, index) => (
                  <li
                    key={index}
                    className="btnActive"
                    onClick={() => setTimeout(() => setImage(image), 250)}
                  >
                    <img src={image} alt="main dish" loading="lazy" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="copyRight">
          <p>
            © 2023 <span>feasta restaurant</span> all right reserved The
            developer is
            <Link to={"mailto: eslamalsayed8133@gmail.com"}>IslamAlsayed</Link>
          </p>
          <p>
            <Link to="tel:+201065438133">(+20) 1065438133</Link> but
            <span className="quote"> the design is quoted</span>
          </p>
        </div>
      </div>

      {image && (
        <div className="image" id="image">
          <div className="content">
            <i
              className="fas fa-xmark btnActive"
              onClick={() => setTimeout(() => setImage(), 250)}
            ></i>
            <img src={image} id="img" alt="full size dish" loading="lazy" />
          </div>
        </div>
      )}
    </div>
  );
}

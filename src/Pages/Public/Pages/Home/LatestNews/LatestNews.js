import "./LatestNews.css";
import React from "react";
import React1 from "../../../../../Assets/images/reacts/react1.jpg";
import React2 from "../../../../../Assets/images/reacts/react2.jpg";
import React3 from "../../../../../Assets/images/reacts/react3.jpg";
import React4 from "../../../../../Assets/images/reacts/react4.jpg";

export default function LatestNews() {
  return (
    <div className="LatestNews">
      <div className="container">
        <div className="title">
          <h2>
            <span>latest</span> news from <span>blog</span>
          </h2>

          <div className="description">
            he lay on his armour-like back, and if he lifed his head a little he
            could his belly. slightly domed and divided by arches into stiff
            sections. the bedding was hardly able to cover it and seemed ready.
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-img">
              <img src={React1} alt="latest new in blog" loading="lazy" />
            </div>
            <div className="card-info">
              <small>28 jan, 2018, admin</small>
              <p>radio commercial marketing</p>
              <p>
                a collection textile samples spread out on the table was a
                travel.
              </p>
            </div>
            <div className="card-react">
              <span>
                <i className="fa-solid fa-message"></i>14
              </span>
              <span>
                <i className="fa-solid fa-heart"></i>25
              </span>
            </div>
          </div>

          <div className="card special">
            <div className="card-img">
              <img src={React2} alt="latest new in blog" loading="lazy" />
            </div>
            <div className="card-info">
              <small>12 feb, 2018, admin</small>
              <p>the bedding was hardly</p>
              <p>
                a collection textile samples spread out on the table was a
                travel.
              </p>
            </div>
            <div className="card-react">
              <span>
                <i className="fa-solid fa-message"></i>05
              </span>
              <span>
                <i className="fa-solid fa-heart"></i>29
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={React3} alt="latest new in blog" loading="lazy" />
            </div>
            <div className="card-info">
              <small>21 mar, 2018, admin</small>
              <p>radio commercial develope</p>
              <p>
                a collection textile samples spread out on the table was a
                travel.
              </p>
            </div>
            <div className="card-react">
              <span>
                <i className="fa-solid fa-message"></i>16
              </span>
              <span>
                <i className="fa-solid fa-heart"></i>22
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={React4} alt="latest new in blog" loading="lazy" />
            </div>
            <div className="card-info">
              <small>10 apr, 2018, admin</small>
              <p>i am alone, and feel the charm</p>
              <p>
                a collection textile samples spread out on the table was a
                travel.
              </p>
            </div>
            <div className="card-react">
              <span>
                <i className="fa-solid fa-message"></i>08
              </span>
              <span>
                <i className="fa-solid fa-heart"></i>16
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

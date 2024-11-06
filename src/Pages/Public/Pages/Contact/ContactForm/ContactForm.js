import "./ContactForm.css";
import React from "react";
import dishMain from "../../../../../Assets/images/dishes/dishMain.jpg";

export default function ContactForm() {
  return (
    <div className="ContactForm">
      <div className="container">
        <div className="contact">
          <div className="form">
            <div className="title">
              <h2>
                get <span>in touch</span>
              </h2>
              <p>contact us</p>
            </div>

            <form id="modelForm" className="modelForm">
              <div className="groups">
                <div className="group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username*"
                  />

                  <div className="group">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="phone number*"
                    />
                  </div>
                </div>

                <label className="error_username"></label>
                <label className="error_phone"></label>
              </div>

              <div className="groups">
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email*"
                  />
                </div>
                <label className="error_email"></label>
              </div>

              <div className="groups">
                <div className="group">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="your message*"
                  ></textarea>
                </div>
                <label className="error_message"></label>
              </div>

              <div className="group">
                <button type="submit" id="sendMail" className="btn btnActive">
                  send message
                </button>
              </div>
            </form>
          </div>

          <div className="info">
            <div className="img">
              <img src={dishMain} alt="main dish" loading="lazy" />
            </div>

            <div className="details">
              <h3>contact details</h3>

              <div className="row">
                <div className="col">
                  <i className="fas fa-location-dot"></i>
                  <span>
                    13 Al-Masaken Street, Port Al-Asadiya Abu Hammad, Sharqia
                    14466
                  </span>
                </div>
                <div className="col">
                  <i className="fas fa-phone"></i>
                  <span>0106538133</span>
                </div>
                <div className="col">
                  <i className="fas fa-envelope"></i>
                  <span>info@feastarestaurant.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

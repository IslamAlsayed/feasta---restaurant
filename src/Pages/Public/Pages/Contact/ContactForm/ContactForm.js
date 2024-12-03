import "./ContactForm.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dishMain from "../../../../../Assets/images/dishes/dishMain.jpg";
import { Link, useLocation } from "react-router-dom";
import { isAuth } from "../../../../../axiosConfig/Auth";
import { addData } from "../../../../../axiosConfig/API";

export default function ContactForm() {
  const location = useLocation();
  const [error, setError] = useState();
  const [userAuth, setUserAuth] = useState();
  const [stateMail, setStateMail] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setUserAuth(isAuth());
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateMail({ ...stateMail, [name]: value });
  };

  const handleStateMail = async (e) => {
    e.preventDefault();
    setTimeout(() => setError(""), 3000);

    if (stateMail.email === '') {
      setError("the email is required");
      return;
    }

    if (stateMail.message === '') {
      setError("the message is required");
      return;
    }

    try {
      let response = await addData("send-mail", stateMail);

      if (response.status === 200) {
        setStateMail({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
        Swal.fire("Saved!", response.result, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.result, "error");
    }
  };

  return (
    <div className="ContactForm">
      <div className="container">
        <div className="contact">
          {userAuth &&
            <div className="form">
              <div className="title">
                <h2>get <span>in touch</span></h2>
                <p>contact us</p>
              </div>

              <form id="modelForm" className="modelForm" onSubmit={(e) => e.preventDefault()}>
                {error && <label className="error">{error}</label>}
                <div className="groups">
                  <div className="group">
                    <input type="text" name="name" id="name" value={stateMail.name} onChange={(e) => handleChange(e)} placeholder="name" />

                    <div className="group">
                      <input type="text" name="phone" id="phone" value={stateMail.phone} onChange={(e) => handleChange(e)} placeholder="phone" />
                    </div>
                  </div>
                </div>

                <div className="groups">
                  <div className="group">
                    <input type="email" name="email" id="email" value={stateMail.email} onChange={(e) => handleChange(e)} placeholder="email*" required />
                  </div>
                  <label className="error_email"></label>
                </div>

                <div className="groups">
                  <div className="group">
                    <textarea name="message" id="message" defaultValue={stateMail.message} onChange={(e) => handleChange(e)} placeholder="message*"></textarea>
                  </div>
                  <label className="error_message"></label>
                </div>

                <div className="group">
                  <button type="submit" id="sendMail" className="btn btnActive" onClick={(e) => handleStateMail(e)}>
                    send message
                  </button>
                </div>
              </form>
            </div>
          }

          <div className="info">
            <div className="img">
              <img src={dishMain} alt="main dish" loading="lazy" />
            </div>

            <div className="details">
              <h3>contact details</h3>

              <div className="row">
                <div className="col">
                  <i className="fas fa-location-dot"></i>
                  <Link to="https://maps.app.goo.gl/vqY2BbCL7hj3iRqv5">
                    Palestine is free and independent
                  </Link>
                </div>
                <div className="col">
                  <i className="fas fa-phone"></i>
                  <Link to="tel:+206549845645">(+20) 6549845645</Link>
                </div>
                <div className="col">
                  <i className="fas fa-envelope"></i>
                  <Link to={"mailto: info@feastarestaurant.com"}>info@feastarestaurant.com</Link>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
}

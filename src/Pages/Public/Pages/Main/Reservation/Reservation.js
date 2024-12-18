import "./Reservation.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Pizza from "../../../../../Assets/images/other/index2/pizza3.png";
import FoodDelivery from "../../../../../Assets/images/icons/main-colors/food-delivery1.png";
import Daily from "../../../../../Assets/images/icons/main-colors/daily.png";
import CallCenter from "../../../../../Assets/images/icons/main-colors/call-center.png";
import Catering from "../../../../../Assets/images/icons/main-colors/catering.png";
import { addData } from "../../../../../axiosConfig/API";
import { USER_HELPER } from "../../../../../Store/helper";

export default function Reservation() {
  const [message, setMessage] = useState();
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    number_of_people: "",
    date: "",
    time: "0",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    if (
      reservation.name !== "" &&
      reservation.email !== "" &&
      reservation.number_of_people !== "" &&
      reservation.date !== "" &&
      reservation.time !== "0" &&
      reservation.phone !== ""
    ) {
      const formData = new FormData();
      formData.append("name", reservation.name);
      formData.append("email", reservation.email);
      formData.append("number_of_people", reservation.number_of_people);
      formData.append("date", reservation.date);
      formData.append("time", reservation.time);
      formData.append("phone", reservation.phone);
      formData.append("client_id", USER_HELPER.id);

      try {
        const response = await addData("reservations", formData);

        if (response.status === 200) {
          setReservation({
            name: "",
            email: "",
            number_of_people: "",
            date: "",
            time: "0",
            phone: "",
          });

          Swal.fire("Saved!", response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.result, "error");
      }
    } else {
      setMessage("All fields are required.");
      setTimeout(() => setMessage(), 5000);
    }
  };

  return (
    <div className="MainReservation">
      <div className="container">
        <div className="action">
          <Link to="/all-recipes" className="btn btnActive">
            see our menu
          </Link>
        </div>

        <div className="reservation">
          <div className="reservation-info">
            <div className="title">
              <h2>
                welcome to the <span>feasta</span>
                <img src={Pizza} alt="pizza crash" loading="lazy" />
              </h2>
              <div className="description">
                we are on the gas safe register and are members of the institute
                of plumbing and heading engineering
              </div>
            </div>

            <div className="cards">
              <div className="card">
                <div className="card-img">
                  <img src={FoodDelivery} alt="delivery food" loading="lazy" />
                </div>
                <div className="card-info">
                  <h3>free delivery</h3>
                  <small>during 45 min</small>
                  <p>
                    Members of the Institute of Plumbing and Heating
                    Engineering. Semantics, a large language ocean.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-img">
                  <img src={Daily} alt="freshly cooked" loading="lazy" />
                </div>
                <div className="card-info">
                  <h3>Freshly Cooked</h3>
                  <small>hot food</small>
                  <p>
                    If several languages coalesce, the grammar of the resulting
                    language is more simple and regular.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-img">
                  <img src={CallCenter} alt="call center: 24 hours support" loading="lazy" required />
                </div>
                <div className="card-info">
                  <h4>24 Hours Support</h4>
                  <small>Food Delivery</small>
                  <p>
                    To achieve this, it would be necessary to have uniform
                    grammar, pronunciation and more common words...
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-img">
                  <img src={Catering} alt="catering: chef experience" loading="lazy" required />
                </div>
                <div className="card-info">
                  <h3>Chef Experience</h3>
                  <small>Our Chef's</small>
                  <p>
                    Everyone realizes why a new common language would be
                    desirable: one could refuse to pay expensive translators...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reservation-form" id="reservation-form">
            <div className="title">
              <span>
                make online <b>reservation</b>
              </span>
              <p>submit information to place order</p>
            </div>

            <div className="form">
              {message && <div className="message">{message}</div>}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    value={reservation.name}
                    onChange={(e) => handleChange(e)}
                    placeholder="your name"
                    required
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    value={reservation.email}
                    onChange={(e) => handleChange(e)}
                    placeholder="your email"
                    required
                  />
                </div>
                <div className="group">
                  <input
                    type="number"
                    name="number_of_people"
                    value={reservation.number_of_people}
                    onChange={(e) => handleChange(e)}
                    placeholder="number of people"
                    required
                  />
                </div>
                <div className="group">
                  <input
                    type="date"
                    name="date"
                    value={reservation.date}
                    onChange={(e) => handleChange(e)}
                    placeholder="date"
                    required
                  />
                </div>
                <div className="group">
                  <select
                    name="time"
                    value={reservation.time}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option value="0" disabled>
                      Time
                    </option>
                    <option value="1">breakfast</option>
                    <option value="2">lunch</option>
                    <option value="3">dinner</option>
                  </select>
                </div>
                <div className="group">
                  <input
                    type="number"
                    name="phone"
                    value={reservation.phone}
                    onChange={(e) => handleChange(e)}
                    placeholder="phone"
                    required
                  />
                </div>
                <button
                  className="btn btnActive"
                  onClick={(e) => handleReservation(e)}
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

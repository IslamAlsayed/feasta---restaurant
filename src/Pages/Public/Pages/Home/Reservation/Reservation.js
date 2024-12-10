import "./Reservation.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import ImageReservation from "../../../../../Assets/images/other/index1/reservation.png";
import { addData } from "../../../../../axiosConfig/API";
import { getUser, isAuth } from "../../../../../axiosConfig/Auth";

export default function Reservation() {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [userAuth, setUserAuth] = useState(false);
  const [message, setMessage] = useState();
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    phone: "",
    capacity: "",
    date: "",
    time: "0",
  });

  useEffect(() => {
    const fetch = getUser();
    setUserAuth(isAuth());
    if (fetch) setUser(fetch);
  }, [location, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleReservation = async () => {
    if (
      reservation.name !== "" &&
      reservation.email !== "" &&
      reservation.phone !== "" &&
      reservation.capacity !== "" &&
      reservation.date !== "" &&
      reservation.time !== "0") {
      const formData = new FormData();
      formData.append("name", reservation.name);
      formData.append("email", reservation.email);
      formData.append("phone", reservation.phone);
      formData.append("capacity", reservation.capacity);
      formData.append("date", reservation.date);
      formData.append("time", reservation.time);
      formData.append("client_id", JSON.parse(user).id);

      try {
        const response = await addData("reservations", formData);

        if (response.status === 200) {
          setReservation({
            name: "",
            email: "",
            phone: "",
            capacity: "",
            date: "",
            time: "0",
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
    userAuth &&
    <div className="AppReservation">
      <div className="container">
        <div className="reservation-img">
          <div className="box-img">
            <img src={ImageReservation} alt="form reservation" />
          </div>
        </div>

        <div className="reservation-form">
          <div className="summery">
            <p><span>feasta</span> online booking</p>
            <p>make online <span>reservation</span></p>
          </div>

          <div className="form">
            {message && <div className="message">{message}</div>}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="groups">
                <div className="group">
                  <input type="text" name="name" value={reservation.name} placeholder="your name" onChange={(e) => handleChange(e)} required />
                </div>

                <div className="group">
                  <input type="text" name="email" value={reservation.email} placeholder="your email" onChange={(e) => handleChange(e)} required />
                </div>

                <div className="group">
                  <input type="number" name="phone" value={reservation.phone} placeholder="phone number" onChange={(e) => handleChange(e)} required />
                </div>

                <div className="group">
                  <input type="text" name="capacity" value={reservation.capacity} placeholder="capacity (max 10)" onChange={(e) => handleChange(e)} required />
                </div>

                <div className="group">
                  <input type="date" name="date" value={reservation.date} onChange={(e) => handleChange(e)} required />
                </div>

                <div className="group">
                  <select name="time" value={reservation.time} onChange={(e) => handleChange(e)} required >
                    <option value="0" disabled>
                      Time
                    </option>
                    <option value="1">breakfast</option>
                    <option value="2">lunch</option>
                    <option value="3">dinner</option>
                  </select>
                </div>
              </div>

              <div className="last-group">
                <button className="btn btnActive" onClick={() => handleReservation()} >
                  book a table
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

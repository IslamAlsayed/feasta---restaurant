import "./Reservation.css";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { getData, updateData } from "../../../../../axiosConfig/API";
import { getUser } from "../../../../../axiosConfig/Auth";

export default function Reservation() {
  const { location } = useLocation();
  const [reservation, setReservation] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = getUser();
    if (fetch) {
      setUser(JSON.parse(fetch));
    }
  }, [location]);

  const fetchReservation = useCallback(async (id) => {
    setLoading(false);

    try {
      const result = await getData(`reservations/${id}`);
      if (result.status === 200) {
        setReservation(result.result);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchReservation(user.id);
  }, [user, fetchReservation]);

  const handleOpenList = (e) => {
    let list = e.target.nextElementSibling;
    let parentEdit = e.target.parentElement;
    let reservation_id = parentEdit.dataset.id;
    let btnCancelled = list.querySelector(".btnCancelled");

    btnCancelled.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        const response = await updateData(`reservations/${reservation_id}`, { status: btnCancelled.dataset.status });

        if (response.status === 200) {
          list.classList.remove("show");

          setReservation(response.data);

          Swal.fire(btnCancelled.dataset.status, response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.message, "error");
      }
    });

    list.classList.toggle("show");

    const handleClickOutside = (event) => {
      if (!parentEdit.contains(event.target)) {
        list.classList.remove("show");
        document.removeEventListener("click", handleClickOutside);
      }
    };

    document.addEventListener("click", handleClickOutside);

    window.addEventListener("scroll", () => {
      list.classList.remove("show");
    });
  }

  if (reservation === "" || reservation !== "cancelled" || !loading) return;

  return (
    <div className="Reservation">
      <div className="container">
        <div className="head">
          <h2><span>your</span> reservation</h2>

          {reservation.time === "breakfast"
            ? <p>Booking time is between 6 am and 12 pm</p>
            : reservation.time === "lunch"
              ? <p>Booking time is between 12 pm and 5 pm</p>
              : reservation.time === "dinner"
                ? <p>Booking time is between 5 pm and 9 pm</p>
                : ''
          }

        </div>

        <div className="row">
          <div className="actions" data-id={reservation.id}>
            <i className="fas fa-ellipsis btnActive" onClick={(e) => handleOpenList(e)}></i>
            <ul className="list" id="list">
              <li className="btnActive">
                <span className="btnCancelled cancelled" data-status="cancelled">
                  cancelled
                  <i className="fas fa-trash"></i>
                </span>
              </li>
            </ul>
          </div>

          <div className="col">{reservation.name}</div>
          <div className="col">{reservation.email}</div>
          <div className="col">{reservation.number_of_people} people</div>
          <div className="col">{reservation.date}</div>
          <div className="col">{reservation.time}</div>
          <div className="col">{reservation.phone}</div>
          <div className="col">status <span className={reservation.status}>{reservation.status}..</span></div>
        </div>
      </div>
    </div>
  );
}

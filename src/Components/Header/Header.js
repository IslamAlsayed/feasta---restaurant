import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { useSelector } from "react-redux";

export default function Header() {
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const [dropListActive, setDropListActive] = useState(false);
  const [listActive, setListActive] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#dropdown")) setDropListActive(false);
      if (e.target.id !== "menu" && e.target.id !== "dropdown_b")
        setListActive(false);
    });

    window.addEventListener("scroll", () => {
      setDropListActive(false);
      setListActive(false);
    });
  }, []);

  const isActive = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? "active" : "";
  };

  function handleClassActive(id) {
    let links = document.querySelectorAll(".link");
    links.forEach((link) => link.classList.remove("active"));

    if (document.getElementById(id)) {
      document.getElementById(id).classList.add("active");
    }
  }

  const handleToggleCartDrawer = () => {
    let cartDrawer = document.getElementById("CartDrawer");
    if (cartDrawer) {
      cartDrawer.classList.toggle("close");
      cartDrawer.classList.toggle("open");
    }
  };

  return (
    <div className="Header">
      <div className="container">
        <Link
          to="/"
          id="home"
          className="logo"
          onClick={() => handleClassActive("logo")}
        >
          <div className="img">
            <img className="logoImg" src={Logo} alt="site logo" />
          </div>
          <div className="title">
            <span>feasta</span>
            <span>egyptian restaurant</span>
          </div>
        </Link>

        <div id="navbar" className="navbar">
          <ul className={`${listActive ? "show" : ""}`} id="listActive">
            <li
              key="1"
              id="1"
              className={`link ${isActive("/main")}`}
              onClick={() => handleClassActive("1")}
            >
              <Link to="/main">main</Link>
            </li>

            <li
              key="2"
              id="2"
              className={`link ${isActive("/menu")}`}
              onClick={() => handleClassActive("2")}
            >
              <Link to="menu">menu</Link>
            </li>

            <li className="options dropdown" id="dropdown">
              <b
                id="dropdown_b"
                className={
                  isActive("/cheffs") ||
                  isActive("/services") ||
                  isActive("/book-table")
                }
                onClick={() => setDropListActive(!dropListActive)}
              >
                pages
                <i className="fas fa-sort-down"></i>
              </b>

              <ul className={`dropList ${dropListActive ? "active" : ""}`}>
                <li>
                  <Link
                    to="/cheffs"
                    className={isActive("/cheffs")}
                    onClick={() => setDropListActive(!dropListActive)}
                  >
                    <i className="fas fa-person-dots-from-line"></i>
                    <span>cheffs</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className={isActive("/services")}
                    onClick={() => setDropListActive(!dropListActive)}
                  >
                    <i className="fas fa-microchip"></i>
                    <span>services</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/book-table"
                    className={isActive("/book-table")}
                    onClick={() => setDropListActive(!dropListActive)}
                  >
                    <i className="fas fa-utensils"></i>
                    <span>book table</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li
              key="5"
              id="5"
              className={`link ${isActive("/contact-us")}`}
              onClick={() => handleClassActive("5")}
            >
              <Link to="contact-us">contact us</Link>
            </li>

            <li
              key="6"
              id="6"
              className={`link ${isActive("/about")}`}
              onClick={() => handleClassActive("6")}
            >
              <Link to="about">about</Link>
            </li>
          </ul>

          <ul>
            <li
              id="cart"
              className="cart"
              data-count={totalQuantity}
              onClick={() => handleToggleCartDrawer()}
            >
              <i className="fa-solid fa-cart-shopping btnActive"></i>
            </li>

            <li
              id="menu"
              className="menu"
              onClick={() => setListActive(!listActive)}
            >
              <i className="fa-solid fa-bars btnActive"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { useSelector } from "react-redux";
import { isAuth, logout } from "../../axiosConfig/Auth";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const TOTAL_QUANTITY = useSelector((state) => state.TOTAL_QUANTITY);
  const [dropListActive, setDropListActive] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const [listActive, setListActive] = useState(false);
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#parentOptions")) setDropListActive(false);
      if (e.target.id !== "menu" && e.target.id !== "parentOptions_b") setListActive(false);
      if (!e.target.closest("#userOptions")) setUserActive(false);
    });

    let prevScroll = window.pageYOffset;
    let header = document.getElementById("Header");
    const handleScroll = () => {
      setDropListActive(false);
      setListActive(false);
      setUserActive(false);

      let currentScrollPos = window.pageYOffset;
      let condition = prevScroll <= 50 ? 100 : 10;

      if (prevScroll > currentScrollPos + 10) {
        if (header) header.style.transform = "translateY(0)";
        prevScroll = currentScrollPos;
      } else if (currentScrollPos > prevScroll + condition) {
        if (header) header.style.transform = "translateY(-100%)";
        prevScroll = currentScrollPos;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let is_auth = isAuth();
    setUserAuth(is_auth);
  }, [location]);

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (JSON.stringify(response.status) === "200") {
      setTimeout(() => {
        navigate("/");
        setUserActive(false);
      }, 500);
    }
  };

  const isActive = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? "active" : "";
  };

  const handleClassActive = (id) => {
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
    <div className="Header" id="Header">
      <div className="container">
        <Link to="/" id="home" className="logo" onClick={() => handleClassActive("logo")} >
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
            <li key="1" id="1" className={`link ${isActive("/main")}`} onClick={() => handleClassActive("1")} >
              <Link to="/main">home 2</Link>
            </li>

            <li key="2" id="2" className={`link ${isActive("/menu")}`} onClick={() => handleClassActive("2")} >
              <Link to="menu">menu</Link>
            </li>

            <li className="options parentOptions" id="parentOptions">
              <b id="parentOptions_b" className={isActive("/chefs") || isActive("/services") || isActive("/book-table")} onClick={() => setDropListActive(!dropListActive)}>
                pages
                <i className="fas fa-sort-down"></i>
              </b>

              <ul className={`dropList ${dropListActive ? "active" : ""}`}>
                <li>
                  <Link to="/chefs" className={isActive("/chefs")} onClick={() => setDropListActive(!dropListActive)} >
                    <i className="fas fa-person-dots-from-line"></i>
                    <span>chefs</span>
                  </Link>
                </li>

                <li>
                  <Link to="/services" className={isActive("/services")} onClick={() => setDropListActive(!dropListActive)} >
                    <i className="fas fa-microchip"></i>
                    <span>services</span>
                  </Link>
                </li>

                <li>
                  <Link to="/book-table" className={isActive("/book-table")} onClick={() => setDropListActive(!dropListActive)} >
                    <i className="fas fa-utensils"></i>
                    <span>book table</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li key="5" id="5" className={`link ${isActive("/contact-us")}`} onClick={() => handleClassActive("5")} >
              <Link to="contact-us">contact us</Link>
            </li>

            <li key="6" id="6" className={`link ${isActive("/about")}`} onClick={() => handleClassActive("6")} >
              <Link to="about">about</Link>
            </li>
          </ul>

          <ul className="navActions">
            <li id="cart" className="cart" data-count={TOTAL_QUANTITY} onClick={() => handleToggleCartDrawer()} >
              <i className="fa-solid fa-cart-shopping btnActive"></i>
            </li>

            <li id="menu" className="menu" onClick={() => setListActive(!listActive)} >
              <i className="fa-solid fa-bars btnActive"></i>
            </li>

            <li id="userOptions" className="user userOptions parentOptions">
              <b id="userOptions_b" className="btnActive" onClick={() => setUserActive(!userActive)} >
                <i className="fa-solid fa-user"></i>
              </b>

              <ul className={`dropList ${userActive ? "active" : ""}`}>
                {!userAuth && (
                  <li>
                    <Link to="/auth/login" className={isActive("/login")}>
                      <i className="fas fa-unlock"></i>
                      <span>login</span>
                    </Link>
                  </li>
                )}
                {userAuth && (
                  <>
                    <li>
                      <Link to="/profile" className={isActive("/profile")} onClick={() => setUserActive(false)}>
                        <i className="fas fa-user"></i>
                        <span>profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth/logout" onClick={(e) => handleLogout(e)} className={isActive("/logout")} >
                        <i className="fas fa-arrow-right-from-bracket"></i>
                        <span>logout</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

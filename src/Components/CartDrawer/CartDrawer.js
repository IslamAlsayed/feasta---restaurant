import "./CartDrawer.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DECREMENT_OR_INCREMENT_HELPER, REMOVE_ITEM_HELPER } from "../../Store/helper";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartNotEmpty, setCartNotEmpty] = useState(false);
  const CART = useSelector((state) => state.CART);
  const TOTAL_PRICE = useSelector((state) => state.TOTAL_PRICE);
  const TOTAL_QUANTITY = useSelector((state) => state.TOTAL_QUANTITY);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const cartDrawer = document.getElementById("CartDrawer");
      const cart = document.getElementById("cart");
      if (cartDrawer && cart && !cartDrawer.contains(e.target) && !cart.contains(e.target)) {
        cartDrawer.classList.add("close");
        cartDrawer.classList.remove("open");
      }
    };

    document.addEventListener("click", handleClickOutside);
  }, []);

  const handleLoader = (element) => {
    const cartDrawer = document.getElementById("CartDrawer");

    if (cartDrawer) {
      if (element === ".closeCart") {
        cartDrawer.classList.add("close");
        cartDrawer.classList.remove("open");
      } else if (element === ".checkOut") {
        const load = document.createElement("div");
        load.className = "load";
        load.style.background = "var(--toxic-color)";

        const span = document.createElement("span");
        load.appendChild(span);
        document.querySelector(element).appendChild(load);

        setTimeout(() => {
          const loaderElement = document.querySelector(`${element} .load`);
          if (loaderElement) loaderElement.remove();
          cartDrawer.classList.add("close");
          cartDrawer.classList.remove("open");
          navigate("/checkout");
        }, 1000);
      }
    }
  };

  useEffect(() => {
    setCartNotEmpty(CART.length > 0 && location.pathname !== "/checkout" ? true : false);
  }, [CART, location]);

  return (
    <div className="CartDrawer close" id="CartDrawer">
      <div className="cart-content">

        <div className="head">
          <span>your orders</span>
          <i className="fas fa-cart-shopping"></i>
        </div>

        <p className="count-dishes"><span>{TOTAL_QUANTITY}</span> dishes</p>

        {!CART.length > 0 && (<h3 className="cart-empty">'The cart is empty'</h3>)}

        <div className="content">
          <div className="cart-items">
            <div className="items">
              {CART.map((item, index) => (
                <div className="item" id={`item_${item.id}`} key={index}>
                  <div className="img">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>

                  <div className="text">
                    <div className="title">{item.title}</div>

                    <div className="price">
                      price: <span>${parseFloat(item.price).toFixed(2)}</span>
                    </div>

                    <div className="total">
                      total: <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      to <span>{item.quantity}s</span>
                    </div>
                  </div>

                  <div className="action">
                    <button className="deleteItem btnActive" id={`delete-item_${item.id}`}
                      onClick={() => REMOVE_ITEM_HELPER(item.id, dispatch)}>
                      <i className="fas fa-trash-can"></i>
                    </button>

                    <div className="quantity">
                      <span className={`btnActive ${item.quantity === 1 && "disabled"}`} onClick={() => DECREMENT_OR_INCREMENT_HELPER(item, "DECREMENT_ITEM", dispatch)}>
                        <b>-</b>
                      </span>

                      <span className="btnActive" onClick={() => DECREMENT_OR_INCREMENT_HELPER(item, "INCREMENT_ITEM", dispatch)}>
                        <b>+</b>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="actions">
            {CART.length > 0 && (
              <div className="totalAllitem">
                <strong>total: </strong>
                <span>${TOTAL_PRICE.toFixed(2)}</span>
              </div>
            )}

            <div className="btns">
              {cartNotEmpty && (
                <button className="checkOut btnActive" onClick={() => handleLoader(".checkOut")} >
                  checkout
                  <i className="fas fa-money-check-dollar"></i>
                </button>
              )}

              <button className="closeCart btnActive" onClick={() => handleLoader(".closeCart")} >
                close cart
                <i className="fas fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./CheckOut.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CheckOut() {
  const dispatch = useDispatch();
  const [makeOrder, setMakeOrder] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const totalPrice = useSelector((state) => state.totalPrice);
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const [userDiscount, setUserDiscount] = useState();
  const [discount, setDiscount] = useState(0);

  const handleIncrement = (item) => {
    dispatch({ type: "INCREMENT_ITEM", payload: item });
  };

  const handleDecrement = (item) => {
    dispatch({ type: "DECREMENT_ITEM", payload: item });
  };

  const handleDiscount = () => {
    if (userDiscount === "islam1") {
      setDiscount(7);
    } else if (userDiscount === "islam2") {
      setDiscount(15);
    } else if (userDiscount === "islam3") {
      setDiscount(45);
    } else {
      setDiscount(0);
    }
  };

  const handleMakeOrder = () => {
    handleLoad("#confirm");
    setTimeout(() => setMakeOrder(true), 1000);

    setTimeout(() => {
      setMakeOrder(false);
      dispatch({ type: "RESET_CART" });
    }, 7000);
  };

  const handleLoad = (element) => {
    const load = document.createElement("div");
    load.className = "load";
    load.style.background = "var(--toxic-color)";

    const span = document.createElement("span");
    load.appendChild(span);
    document.querySelector(element).appendChild(load);

    setTimeout(() => {
      const loaderElement = document.querySelector(`${element} .load`);
      if (loaderElement) loaderElement.remove();
    }, 1000);
  };

  return (
    <div className="CheckOut">
      <div className="container">
        <h1 className="title">your orders</h1>

        <table className="orders">
          <thead className="orders-head">
            <tr>
              <th>orders</th>
              <th>quantity</th>
              <th>price</th>
              <th>vat</th>
              <th>total</th>
              <th className="wait">delete</th>
            </tr>
          </thead>

          <tbody className="orders-body">
            {cartItems.map((item, index) => (
              <tr className="product" key={index}>
                <td className="img">
                  <img
                    src={require(`../../../../${item.image}`)}
                    alt={item.name}
                    loading="lazy"
                  />
                  <p>{item.name}</p>
                </td>

                <td className="quantity">
                  <span
                    className="btnActive"
                    onClick={() => handleDecrement(item)}
                  >
                    <b>-</b>
                  </span>
                  <b>{item.quantity}</b>
                  <span
                    className="btnActive"
                    onClick={() => handleIncrement(item)}
                  >
                    <b>+</b>
                  </span>
                </td>

                <td className="price">${item.price}</td>

                <td className="vat">
                  {item.quantity > 1
                    ? (item.quantity * item.vat - item.vat).toFixed(1) + "%"
                    : 0}
                </td>

                <td className="total">
                  $
                  {(
                    (item.vat / 100) * (item.price * item.quantity) +
                    item.price * item.quantity
                  ).toFixed(2)}
                </td>

                <td className="action">
                  <button className="btn btnActive delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="orders-foot">
            <tr>
              <td>Total All</td>
              <td>
                <span>{totalQuantity}</span> Dishes
              </td>
              <td colSpan="3">
                Pay <span className="total">${totalPrice.toFixed(2)}</span>
              </td>
              <td className="wait">--</td>
            </tr>
          </tfoot>
        </table>

        {makeOrder && (
          <div className="waitEndOrder">
            <i className="fa-solid fa-stopwatch"></i>
            <span>...please wait to end order</span>
          </div>
        )}

        {cartItems.length > 0 && !makeOrder && (
          <div className="discount">
            {discount !== 0 && (
              <div className="note-discount">
                <span>discount: {discount}%</span>
                <b>
                  -$
                  {(
                    totalPrice -
                    (totalPrice - (totalPrice * discount) / 100)
                  ).toFixed(2)}
                </b>
              </div>
            )}

            <form className="formDiscount" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="userDiscount"
                id="userCoupon"
                value={userDiscount}
                onChange={(e) => setUserDiscount(e.target.value)}
                placeholder="Enter your coupon code"
              />
              <button
                className={`btn btnActive ${
                  userDiscount !== "islam1" &&
                  userDiscount !== "islam2" &&
                  userDiscount !== "islam3" &&
                  "disabled"
                }`}
                onClick={() => handleDiscount()}
              >
                apply
              </button>
            </form>

            <div className="coupons">
              You can use these coupons:
              <span>
                <small data-discount="7">islam1</small>
                <small data-discount="15">islam2</small>
                <small data-discount="45">islam3</small>
              </span>
            </div>
          </div>
        )}

        <div className="payment">
          {cartItems.length > 0 && (
            <div className="address">
              <h2>address shipping</h2>
              <form action="">
                <input type="text" placeholder="united kingdom (UK)" />
                <div className="group">
                  <input type="text" placeholder="state / country" />
                  <input type="text" placeholder="post code / zip" />
                </div>
                <button className="btn btnActive">update address</button>
              </form>
            </div>
          )}

          <div className="confirm-order">
            <h2>cart total</h2>

            <div className="order">
              <div className="row">
                <div className="col">subTotal</div>
                <div className="">${totalPrice.toFixed(2)}</div>
              </div>

              <div className="row">
                <div className="col">shipping</div>
                <div className="col shipping">free shipping</div>
              </div>

              <div className="row">
                <div className="col">total:</div>
                <div className="col total">
                  <span className="pay-discount">
                    ${(totalPrice - (totalPrice * discount) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
              {!makeOrder && (
                <select name="foodTable_id" id="foodTable_id">
                  <option value="-1">--</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((table, index) => (
                    <option value={table} key={index}>
                      table {table}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="confirm">
              <Link to="/all-recipes" className="btn btnActive">
                continue shopping
              </Link>

              <button
                className={`btn btnActive details ${
                  cartItems.length <= 0 || makeOrder ? "disabled" : ""
                }`}
                id="confirm"
                onClick={() => handleMakeOrder()}
              >
                confirm order
              </button>
            </div>
          </div>
        </div>

        <div className="payment-popup">
          <div className="inner">
            <i className="fas fa-check"></i>
            <h2>are you sure?</h2>
            <p>
              knowledge! The order cannot be canceled otherwise the added tax
              will be charged
            </p>
            <button className="ok btnActive">ok</button>
            <i className="fas fa-xmark"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

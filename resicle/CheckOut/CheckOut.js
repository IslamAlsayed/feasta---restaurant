import "./CheckOut.css";
import Pusher from "pusher-js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DECREMENT_OR_INCREMENT_HELPER } from "../../src/Store/helper";
import { addData } from "../../src/axiosConfig/API";
import { isAuth } from "../../src/axiosConfig/Auth";

export default function CheckOut() {
  const dispatch = useDispatch();
  const CART = useSelector((state) => state.CART);
  const TOTAL_QUANTITY = useSelector((state) => state.TOTAL_QUANTITY);
  const TOTAL_PRICE_WITH_VAT = useSelector((state) => state.TOTAL_PRICE_WITH_VAT);
  const [order, setOrder] = useState({ items: JSON.stringify(CART), total: TOTAL_PRICE_WITH_VAT, address: "", wayPay: "", client_id: "" });
  const [makeOrder, setMakeOrder] = useState(false);
  const [message, setMessage] = useState();
  const [userDiscount, setUserDiscount] = useState();
  const [address, setAddress] = useState({ country: "", village: "", street: "" });
  const [addressStatus, setAddressStatus] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [wayPay, setWayPay] = useState("");

  useEffect(() => {
    const addressStorage = localStorage.getItem("addressStatus");
    setMakeOrder(!!addressStorage);
    setAddressStatus(!!addressStorage);
  }, []);

  const handleDiscount = useCallback(() => {
    switch (userDiscount) {
      case "islam1": setDiscount(7); break;
      case "islam2": setDiscount(15); break;
      case "islam3": setDiscount(45); break;
      default: setDiscount(0); break;
    }
  }, [userDiscount]);

  useEffect(() => {
    if (isAuth()) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        items: JSON.stringify(CART),
        total: parseFloat(TOTAL_PRICE_WITH_VAT.toFixed(2)),
        discount,
        client_id: JSON.parse(Cookies.get("feasta_admin")).id,
      }));
    }
  }, [CART, discount]);

  const handleWayPay = (e) => {
    setWayPay(e)
    if (wayPay) setOrder((prev) => ({ ...prev, wayPay: wayPay }));
  };

  const handleAddress = useCallback((e) => {
    const { name, value } = e.target;

    const addressStorage = localStorage.getItem("addressStatus");
    setMakeOrder(!!addressStorage);
    setAddressStatus(!!addressStorage);

    if (name) setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  }, []);

  const handleUpdateAddress = useCallback((e) => {
    e.preventDefault();
    if (address.country && address.village && address.street) {
      setOrder((prevOrder) => ({ ...prevOrder, address: JSON.stringify(address) }));
      setAddressStatus(true);
    } else {
      setMessage("Your address is required.");
      setTimeout(() => setMessage(), 5000);
    }
  }, [address]);

  const handleMakeOrder = useCallback(async (e) => {
    e.preventDefault();

    if (addressStatus) {
      try {
        const response = await addData("orders", order);

        if (response.status === 200) {
          setOrder({ items: "", total: 0, address: "", discount: 0, client_id: "", wayPay: "" });

          localStorage.setItem("orderId", response.data.id);
          localStorage.setItem("addressStatus", addressStatus);

          handleLoad("#confirm");
          setTimeout(() => setMakeOrder(true), 1000);
          Swal.fire("Saved!", response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.result, "error");
      }
    } else {
      setMessage("Your address is required.");
      setTimeout(() => setMessage(), 5000);
    }
  }, [order, addressStatus]);

  //! Watch out there pusher
  const pusher = useMemo(() => {
    return new Pusher('96467a2e5f59e964e43f', {
      cluster: 'eu',
      authEndpoint: 'http://127.0.0.1:8000/api/pusher/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${Cookies.get('feasta_token')}`
        }
      }
    });
  }, []);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    const channel = pusher.subscribe(`chat.message.${orderId}`);

    const handleMessage = (data) => {
      if (data.status === 200) {
        setMakeOrder(false);
        setAddressStatus(false);
        dispatch({ type: "RESET_CART" });
        localStorage.removeItem("addressStatus");
        Swal.fire("Saved!", data.result, "success");
      }
    };

    channel.bind('SendMessageChat', handleMessage);

    return () => {
      channel.unbind('SendMessageChat', handleMessage);
      channel.disconnect();
    };
  }, [pusher, dispatch]);

  const handleLoad = useCallback((element) => {
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
  }, []);

  return (
    <div className="CheckOut">
      <div className="container">
        <h1 className="title">your cart items</h1>

        <table className="orders">
          <thead className="orders-head">
            <tr>
              <th>orders</th>
              <th>quantity</th>
              <th>price</th>
              <th>vat</th>
              <th>total</th>
              {!makeOrder && <th className="wait">delete</th>}
            </tr>
          </thead>

          <tbody className="orders-body">
            {CART.map((item, index) => (
              <tr className="product" key={index}>
                <td className="img">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <p>{item.title}</p>
                </td>

                <td className="quantity">
                  <span className="btnActive"
                    onClick={() => DECREMENT_OR_INCREMENT_HELPER(item, "DECREMENT_ITEM", dispatch)} >
                    <b>-</b>
                  </span>

                  <b>{item.quantity}</b>

                  <span className="btnActive"
                    onClick={() => DECREMENT_OR_INCREMENT_HELPER(item, "INCREMENT_ITEM", dispatch)} >
                    <b>+</b>
                  </span>
                </td>

                <td className="price">${item.price}</td>

                <td className="vat">{item.vat}</td>

                <td className="total">
                  ${((item.vat) * (item.price * item.quantity) + item.price * item.quantity).toFixed(2)}
                </td>

                {!makeOrder &&
                  <td className="action">
                    <button className="btn btnActive delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                }
              </tr>
            ))}
          </tbody>

          <tfoot className="orders-foot">
            <tr>
              <td>Total All</td>
              <td><span>{TOTAL_QUANTITY}</span> Dishes</td>
              <td colSpan="3">Pay <span className="total">${TOTAL_PRICE_WITH_VAT.toFixed(2)}</span></td>
              {!makeOrder && <td className="wait">--</td>}
            </tr>
          </tfoot>
        </table>

        {makeOrder && (
          <div className="waitEndOrder">
            <i className="fa-solid fa-stopwatch"></i>
            <span>...please wait to end order</span>
          </div>
        )}

        {CART.length > 0 && !makeOrder && (
          <div className="discount">
            {discount !== 0 && (
              <div className="note-discount">
                <span>discount: {discount}%</span>
                <b>-${(TOTAL_PRICE_WITH_VAT - (TOTAL_PRICE_WITH_VAT - (TOTAL_PRICE_WITH_VAT * discount) / 100)).toFixed(2)}</b>
              </div>
            )}

            <div className="payment_method">
              <p>Choose payment method <span>(required)</span></p>

              <div class="ways">
                <span className="way btnActive" onClick={() => handleWayPay("")}>remove</span>
                <span className="way btnActive" onClick={() => handleWayPay("cash")}>cash</span>
                <span className="way btnActive" onClick={() => handleWayPay("wallet")}>wallet</span>
                <span className="way btnActive" onClick={() => handleWayPay("bank")}>bank</span>
              </div>
            </div>

            {wayPay === 'wallet' || (wayPay === 'bank') ?
              <>
                <form className="formDiscount" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" name="userDiscount" id="userCoupon" value={userDiscount} onChange={(e) => setUserDiscount(e.target.value)} placeholder="Enter your coupon code" />
                  <button
                    className={`btn btnActive ${userDiscount !== "islam1" && userDiscount !== "islam2" && userDiscount !== "islam3" && "disabled"}`}
                    onClick={handleDiscount}>
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
              </>
              : null
            }
          </div>
        )}

        <div className="payment">
          {CART.length > 0 && wayPay && (
            <div className="address">
              <h2>address shipping</h2>
              {message && <div className="message">{message}</div>}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="groups">
                  <div className="group">
                    <input type="text" name="country" id="country" className={addressStatus ? "disabled" : ""} value={address.country} onChange={(e) => handleAddress(e)} placeholder=" " disabled={addressStatus} required />
                    <label htmlFor="country" className={addressStatus ? "disabled" : ""}>country *</label>
                  </div>
                  <div className="group">
                    <input type="text" name="village" id="village" className={addressStatus ? "disabled" : ""} value={address.village} onChange={(e) => handleAddress(e)} placeholder=" " disabled={addressStatus} required />
                    <label htmlFor="village" className={addressStatus ? "disabled" : ""}>village *</label>
                  </div>
                </div>
                <div className="group">
                  <input type="text" name="street" id="street" className={addressStatus ? "disabled" : ""} value={address.street} onChange={(e) => handleAddress(e)} placeholder=" " disabled={addressStatus} required />
                  <label htmlFor="street" className={addressStatus ? "disabled" : ""}>street</label>
                </div>
                <button type="submit" className={`btn btnActive ${addressStatus ? "disabled" : ""}`} disabled={addressStatus} onClick={(e) => handleUpdateAddress(e)}>update address</button>
              </form>
            </div>
          )}

          <div className="confirm-order">
            <h2>cart total</h2>

            <div className="order">
              <div className="row">
                <div className="col">subTotal</div>
                <div className={discount > 0 ? "s" : ""}>${TOTAL_PRICE_WITH_VAT.toFixed(2)}</div>
              </div>

              <div className="row">
                <div className="col">shipping</div>
                <div className="col shipping">free shipping</div>
              </div>

              <div className="row">
                <div className="col">total:</div>
                <div className="col total">
                  <span className="pay-discount">
                    ${(TOTAL_PRICE_WITH_VAT - (TOTAL_PRICE_WITH_VAT * discount) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="confirm">
              <Link to="/all-recipes" className="btn btnActive">
                continue shopping
              </Link>

              <button className={`btn btnActive details ${CART.length <= 0 || makeOrder || !wayPay ? "disabled" : ""}`}
                id="confirm" onClick={(e) => handleMakeOrder(e)} >
                confirm order
              </button>
            </div>
          </div>
        </div>

        <div className="payment-popup">
          <div className="inner">
            <i className="fas fa-check"></i>
            <h2>are you sure?</h2>
            <p> knowledge! The order cannot be canceled otherwise the added tax will be charged</p>
            <button className="ok btnActive">ok</button>
            <i className="fas fa-xmark"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

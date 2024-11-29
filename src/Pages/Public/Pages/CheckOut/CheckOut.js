import "./CheckOut.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { DECREMENT_OR_INCREMENT_HELPER } from "../../../../Store/helper";
import { addData } from "../../../../axiosConfig/API";

export default function CheckOut() {
  const dispatch = useDispatch();
  const [makeOrder, setMakeOrder] = useState(false);
  const { CART, TOTAL_PRICE, TOTAL_QUANTITY } = useSelector((state) => state);
  const [order, setOrder] = useState({ items: JSON.stringify(CART), total: TOTAL_PRICE, client_id: "", table_id: "" });
  const [userDiscount, setUserDiscount] = useState();
  const [discount, setDiscount] = useState(0);

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

  useEffect(() => {
    setOrder({
      ...order,
      items: JSON.stringify(CART),
      total: parseFloat(TOTAL_PRICE.toFixed(2)),
      discount: discount,
      client_id: JSON.parse(Cookies.get("feasta_admin")).id,
      table_id: 1
    });
  }, [CART, discount])

  const handleMakeOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await addData("orders", order);
      localStorage.removeItem("orderId")

      if (response.status === 200) {
        // setOrder({ items: "", total: 0, discount: 0, client_id: "", table_id: "" });

        localStorage.setItem("orderId", response.data.id);

        handleLoad("#confirm");

        // setTimeout(() => setMakeOrder(true), 1000);

        // setTimeout(() => {
        // setMakeOrder(false);
        // dispatch({ type: "RESET_CART" });
        // }, 7000);

        Swal.fire("Saved!", response.result, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.result, "error");
    }
  };

  // useEffect(() => {
  //   const pusher = new Pusher("96467a2e5f59e964e43f", {
  //     cluster: "eu",
  //     encrypted: true,
  //     // auth: {
  //     //   headers: {
  //     //     Authorization: `Bearer ${Cookies.get("feasta_token")}`,
  //     //   }
  //     // }
  //   });

  //   // pusher.connect();
  //   const orderId = 18;
  //   // const channel = pusher.subscribe(`private-orders.${orderId}`);
  //   const channel = pusher.subscribe(`chat`);
  //   channel.bind("Message", (data) => {
  //     console.log(data);
  //   });

  //   return () => {
  //     pusher.unsubscribe(`chat`);
  //     // pusher.disconnect();
  //   };
  // }, []);


  // useEffect(() => {
  //   let pusher = new Pusher("96467a2e5f59e964e43f", { cluster: "eu", encrypted: true });

  //   let channel = pusher.subscribe("chat");

  //   channel.bind("Message", (message) => console.log(message));

  //   return () => { pusher.unsubscribe("chat") };
  // }, []);

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

                <td className="vat">{item.vat}%</td>

                <td className="total">
                  $ {((item.vat) * (item.price * item.quantity) + item.price * item.quantity).toFixed(2)}
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
              <td colSpan="3">Pay <span className="total">${TOTAL_PRICE.toFixed(2)}</span></td>
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
                <b>-${(TOTAL_PRICE - (TOTAL_PRICE - (TOTAL_PRICE * discount) / 100)).toFixed(2)}</b>
              </div>
            )}

            <form className="formDiscount" onSubmit={(e) => e.preventDefault()}>
              <input type="text" name="userDiscount" id="userCoupon" value={userDiscount} onChange={(e) => setUserDiscount(e.target.value)} placeholder="Enter your coupon code" />
              <button
                className={`btn btnActive ${userDiscount !== "islam1" && userDiscount !== "islam2" && userDiscount !== "islam3" && "disabled"}`}
                onClick={() => handleDiscount()}>
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
          {CART.length > 0 && (
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
                <div className={discount > 0 ? "s" : ""}>${TOTAL_PRICE.toFixed(2)}</div>
              </div>

              <div className="row">
                <div className="col">shipping</div>
                <div className="col shipping">free shipping</div>
              </div>

              <div className="row">
                <div className="col">total:</div>
                <div className="col total">
                  <span className="pay-discount">
                    ${(TOTAL_PRICE - (TOTAL_PRICE * discount) / 100).toFixed(2)}
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

              <button className={`btn btnActive details ${CART.length <= 0 || makeOrder ? "disabled" : ""}`}
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

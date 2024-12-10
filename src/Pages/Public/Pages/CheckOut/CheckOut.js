import "./CheckOut.css";
import Pusher from "pusher-js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DECREMENT_OR_INCREMENT_HELPER, USER_HELPER, WAYSEAT, WAYSPAY } from "../../../../Store/helper";
import { addData, deleteData, getData, updateData } from "../../../../axiosConfig/API";
import { useLocation } from "react-router-dom";

export default function CheckOut() {
  const dispatch = useDispatch();
  const location = useLocation();
  const CART = useSelector((state) => state.CART);
  const TOTAL_PRICE = useSelector((state) => state.TOTAL_PRICE);
  const [errors, setErrors] = useState({});
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [existOrder, setExistOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    wayEat: "",
    wayPay: "cash",
    client: { name: "", email: "", phone: "" },
    address: { country: "", village: "", street: "" },
    items: JSON.stringify(CART),
    total: parseFloat(TOTAL_PRICE.toFixed(2)),
    discount: 0,
    client_id: ""
  });

  useEffect(() => {
    if (USER_HELPER) {
      setOrder({ ...order, client_id: USER_HELPER.id });
    }
  }, [order, USER_HELPER, location]);

  useEffect(() => {
    if (CART.length > 0) {
      const options = [0, 5, 10, 15, 20];
      const cachedShipping = options[Math.floor(Math.random() * options.length)];

      const storedShipping = sessionStorage.getItem("cachedShipping");
      if (storedShipping) {
        setShipping(Number(storedShipping));
      } else {
        sessionStorage.setItem("cachedShipping", cachedShipping);
        setShipping(cachedShipping);
      }
    }
  }, [CART]);

  useEffect(() => {
    let totalWithDiscount = (TOTAL_PRICE - (TOTAL_PRICE * discount) / 100);
    setOrder((prev) => ({ ...prev, total: parseFloat((totalWithDiscount).toFixed(2)), discount: discount }));
  }, [TOTAL_PRICE, discount]);

  const handleClick = (name, value) => {
    setOrder({ ...order, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    setLoading(true);

    const checkOrderStatus = async () => {
      let orderId = localStorage.getItem("orderId");
      if (orderId) {
        try {
          const result = await getData(`orders/${orderId}`);
          if (result.status === 200 && result.result) {
            if (result.result.status === "pending") {
              setExistOrder(true);
            } else {
              setExistOrder(false);
            }
          } else {
            setExistOrder(false);
          }
          setLoading(true);
        } catch (error) {
          setLoading(true);
          console.log("Error fetching order data: ", error);
        }
      }
    };

    checkOrderStatus();
  }, [location]);

  const handlePayNow = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!order.wayEat) newErrors.wayEat = "The way eat is required";
    if (!order.wayPay) newErrors.wayPay = "The way pay is required";
    if (!USER_HELPER && !order.client.name) newErrors.name = "The name is required";
    if (!USER_HELPER && !order.client.email) newErrors.email = "The email is required";
    if (!USER_HELPER && !order.client.phone) newErrors.phone = "The phone is required";
    if (order.wayEat === "delivery" && !order.address.country) newErrors.country = "The country is required";
    if (order.wayEat === "delivery" && !order.address.village) newErrors.village = "The village is required";
    if (order.wayEat === "delivery" && !order.address.street) newErrors.street = "The street is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      let newOrder = { ...order, client: JSON.stringify(order.client), address: JSON.stringify(order.address), ...(USER_HELPER && { client_id: USER_HELPER.id }) };

      if (USER_HELPER.id) {
        try {
          let response;
          let cartId = localStorage.getItem("cartId");
          let code = localStorage.getItem("code");

          if (!cartId) {
            response = await addData("cart", order);
            if (response.status === 200) {
              localStorage.setItem("cartId", response.data.id);
              localStorage.setItem("code", response.data.code);
            }
          } else {
            response = await updateData(`cart/${cartId}/${code}`, order);
          }

          if (response.status === 200) {
            let cartCount = document.getElementById("cart");
            if (cartCount) {
              cartCount.classList.add("added");
              setTimeout(() => cartCount.classList.remove("added"), 140);
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      }

      try {
        const response = await addData("orders", newOrder);

        if (response.status === 200) {
          localStorage.setItem("orderId", response.data.id);

          setExistOrder(true);
          setOrder({
            wayEat: "",
            wayPay: "cash",
            client: { name: "", email: "", phone: "" },
            address: { country: "", village: "", street: "" },
            items: JSON.stringify(CART),
            total: 0,
            discount: 0,
            client_id: 1
          });

          Swal.fire("Saved!", response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error?.result || error?.message, "error");
      }
    }
  };

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
    let orderId = localStorage.getItem("orderId");

    if (orderId) {
      const channel = pusher.subscribe(`chat.message.${orderId}`);
      const handleMessage = async (data) => {
        if (data.status === 200) {
          setExistOrder(false);
          setShipping(0);
          dispatch({ type: "RESET_CART" });

          let cartId = localStorage.getItem("cartId");
          let code = localStorage.getItem("code");

          if (USER_HELPER.id && cartId && code) {
            try {
              const response = await deleteData(`cart/${cartId}/${code}`);
              if (response.status === 200) {
                console.log(response.result);
                localStorage.removeItem("cartId");
              }
            } catch (error) {
              console.log('error', error);
            }
          }

          localStorage.removeItem("cartItems");
          localStorage.removeItem("orderId");
          localStorage.removeItem("code");
          sessionStorage.removeItem("cachedShipping");
          Swal.fire("Saved!", data.result, "success");
        }
      };

      channel.bind('SendMessageChat', handleMessage);

      return () => {
        channel.unbind('SendMessageChat', handleMessage);
        channel.disconnect();
      };
    }
  }, [pusher, dispatch]);

  if (!loading) return;

  return (
    <div className={`CheckOut ${!existOrder && CART.length > 0 && "existOrder"}`}>
      <div className="container">
        <h1>checkout</h1>

        {!existOrder && CART.length > 0 &&
          <div className="alert-code-discount">Use this code <i>islam</i> to get 25% discount</div>
        }

        {existOrder && CART.length > 0 &&
          <div className="waitEndOrder">
            <i className="fa-solid fa-stopwatch"></i>
            <span>please wait to finished your order...</span>
          </div>
        }

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {!existOrder && CART.length > 0 &&
            <div className="information">
              <h2>shipping information</h2>

              {/* [ way eat, way pay ] */}
              <div className="wayPays">
                {/* way eat */}
                <div className="wayPay-info">
                  <h3>way eat</h3>

                  <div className={`ways ${errors?.wayEat ? 'red' : ''}`}>
                    {WAYSEAT.map((way, index) => (way.active &&
                      <div className={`way ${order.wayEat === way.key && "active"}`} onClick={() => handleClick("wayEat", way.key)} key={index}>
                        <input type="radio" name="wayEat" value={order.wayEat} id={way.key} checked={order.wayEat === way.key} readOnly />
                        <label htmlFor={way.key}></label>
                        <i className={`fas ${way.icon}`}></i>
                        <span>{way.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* way pay */}
                <div className="wayPay-info">
                  <h3>way pay</h3>

                  <div className={`ways ${errors?.wayPay ? 'red' : ''}`}>
                    {WAYSPAY.map((way, index) => (way.active &&
                      <div className={`way ${order.wayPay === way.key && "active"}`} onClick={() => handleClick("wayPay", way.key)} key={index}>
                        <input type="radio" name="wayPay" value={order.wayPay} id={way.key} checked={order.wayPay === way.key} readOnly />
                        <label htmlFor={way.key}></label>
                        <i className={`fas ${way.icon}`}></i>
                        <span>{way.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* [ name, email, phone ] */}
              {!USER_HELPER &&
                <div className="client-info">
                  {/* name */}
                  <div className="group">
                    <input type="text" name="name" id="name" className={errors?.name ? 'red' : ''} value={order.client.name} placeholder=" "
                      onChange={(e) => handleChange(e, "client")} />
                    <label htmlFor="name">name <span>*</span></label>
                  </div>

                  {/* email */}
                  <div className="group">
                    <input type="email" name="email" id="email" className={errors?.email ? 'red' : ''} value={order.client.email} placeholder=" "
                      onChange={(e) => handleChange(e, "client")} />
                    <label htmlFor="email">email <span>*</span></label>
                  </div>

                  {/* phone */}
                  <div className="group">
                    <input type="text" name="phone" id="phone" className={errors?.phone ? 'red' : ''} value={order.client.phone} placeholder=" "
                      onChange={(e) => handleChange(e, "client")} />
                    <label htmlFor="phone">phone <span>*</span></label>
                  </div>
                </div>
              }

              {/* [ country, village, street ] */}
              {order.wayEat === "delivery" &&
                <div className="address-info">
                  <h3>address shipping</h3>

                  <div className="groups">
                    {/* country */}
                    <div className="group">
                      <input type="text" name="country" id="country" className={errors?.country ? 'red' : ''} value={order.address.country} placeholder=" "
                        onChange={(e) => handleChange(e, "address")} />
                      <label htmlFor="country">country <span>*</span></label>
                    </div>

                    {/* village */}
                    <div className="group">
                      <input type="text" name="village" id="village" className={errors?.village ? 'red' : ''} value={order.address.village} placeholder=" "
                        onChange={(e) => handleChange(e, "address")} />
                      <label htmlFor="village">village <span>*</span></label>
                    </div>
                  </div>

                  {/* street */}
                  <div className="group">
                    <input type="text" name="street" id="street" className={errors?.street ? 'red' : ''} value={order.address.street} placeholder=" "
                      onChange={(e) => handleChange(e, "address")} />
                    <label htmlFor="street">street <span>*</span></label>
                  </div>
                </div>
              }
            </div>
          }

          <div className={`cartItems ${existOrder && "flex"}`}>
            {/* items */}
            <div className="items">
              <h3>your cart items {CART.length < 1 && <span>is empty</span>}</h3>

              {CART.map((item, index) => (
                <div className="item" key={index}>
                  <div className="image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="text">
                    <p>{item.title}</p>
                    <p>
                      <span>{item.quantity}x</span>
                      {!existOrder &&
                        <span className="quantity">
                          <span className={`btnActive ${item.quantity === 1 && "disabled"}`} onClick={() => DECREMENT_OR_INCREMENT_HELPER(item, "DECREMENT_ITEM", dispatch)}>
                            <i className="fas fa-minus"></i>
                          </span>

                          <span className="btnActive" onClick={() => DECREMENT_OR_INCREMENT_HELPER(item, "INCREMENT_ITEM", dispatch)}>
                            <i className="fas fa-plus"></i>
                          </span>
                        </span>
                      }
                    </p>
                    <p>${(item.quantity > 1 ? item.price * item.quantity : item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* discount */}
            {!existOrder && CART.length > 0 &&
              <div className="discount">
                <input type="text" name="discount" id="discount" value={code} placeholder="discount code"
                  onChange={(e) => setCode(e.target.value)} />
                <button type="click" onClick={() => setDiscount(code === "islam" ? 25 : 0)}>apply</button>
              </div>
            }

            {/* order totals */}
            <div className="order">
              <div className="row">
                <div className="col">subTotal</div>
                <div className={discount && discount > 0 || shipping > 0 ? "s" : ""}>${(TOTAL_PRICE - shipping).toFixed(2)}</div>
              </div>

              <div className="row">
                <div className="col">shipping</div>
                <div className="col shipping">{CART.length < 1 ? <b>- - - - - -</b> : shipping < 1 ? "free shipping" : "$" + shipping}</div>
              </div>

              <div className="row">
                <div className="col">total:</div>
                <div className="col total">
                  <span className="pay-discount">
                    ${(discount && discount > 0 ? (TOTAL_PRICE - (TOTAL_PRICE * discount) / 100) : TOTAL_PRICE).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* pay now */}
            {!existOrder && CART.length > 0 &&
              <div className="pay-now">
                <button type="click" className="btnActive" onClick={(e) => handlePayNow(e)}>pay now</button>
              </div>
            }
          </div>
        </form>
      </div >
    </div >
  );
}

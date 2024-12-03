import "./CheckOut.css";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WAYSEAT, WAYSPAY } from "../../../../Store/helper";
import { addData } from "../../../../axiosConfig/API";

export default function CheckOut() {
  const dispatch = useDispatch();
  const CART = useSelector((state) => state.CART);
  const TOTAL_PRICE_WITH_VAT = useSelector((state) => state.TOTAL_PRICE_WITH_VAT);
  const [errors, setErrors] = useState({});
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [order, setOrder] = useState({
    wayEat: "",
    wayPay: "cash",
    client: { name: "", email: "", phone: "" },
    address: { country: "", village: "", street: "" },
    items: JSON.stringify(CART),
    total: parseFloat(TOTAL_PRICE_WITH_VAT.toFixed(2)),
    discount: 0,
    client_id: 1
  });

  useEffect(() => {
    let totalWithDiscount = (TOTAL_PRICE_WITH_VAT - (TOTAL_PRICE_WITH_VAT * discount) / 100);
    setOrder((prev) => ({ ...prev, total: parseFloat(totalWithDiscount.toFixed(2)), discount: discount }));
  }, [TOTAL_PRICE_WITH_VAT, discount]);

  const handleClick = (name, value) => {
    setOrder({ ...order, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
    setErrors({ ...errors, [name]: "" });
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!order.wayEat) newErrors.wayEat = "The way eat is required";
    if (!order.wayPay) newErrors.wayPay = "The way pay is required";
    if (!order.client.name) newErrors.name = "The name is required";
    if (!order.client.email) newErrors.email = "The email is required";
    if (!order.client.phone) newErrors.phone = "The phone is required";
    if (order.wayEat === "delivery" && !order.address.country) newErrors.country = "The country is required";
    if (order.wayEat === "delivery" && !order.address.village) newErrors.village = "The village is required";
    if (order.wayEat === "delivery" && !order.address.street) newErrors.street = "The street is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newOrder = { ...order, client: JSON.stringify(order.client), address: JSON.stringify(order.address) };

      try {
        const response = await addData("orders", newOrder);

        if (response.status === 200) {
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

  return (
    <div className="CheckOut">
      <div className="container">
        <h1>checkout</h1>

        <div className="alert-code-discount">Use this code <i>islam</i> to get 25% discount</div>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
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

          <div className="cartItems">
            <h3>your cart items</h3>

            {/* items */}
            <div className="items">
              {CART.map((item, index) => (
                <div className="item" key={index}>
                  <div className="image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="text">
                    <p>{item.title}</p>
                    <p>{item.quantity}x</p>
                    <p>${(item.quantity > 1 ? item.price * item.quantity : item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* discount */}
            <div className="discount">
              <input type="text" name="discount" id="discount" value={code} placeholder="discount code"
                onChange={(e) => setCode(e.target.value)} />
              <button type="click" onClick={() => setDiscount(code === "islam" ? 25 : 0)}>apply</button>
            </div>

            {/* order totals */}
            <div className="order">
              <div className="row">
                <div className="col">subTotal</div>
                <div className={discount && discount > 0 ? "s" : ""}>${TOTAL_PRICE_WITH_VAT.toFixed(2)}</div>
              </div>

              <div className="row">
                <div className="col">shipping</div>
                <div className="col shipping">free shipping</div>
              </div>

              <div className="row">
                <div className="col">total:</div>
                <div className="col total">
                  <span className="pay-discount">
                    ${(discount && discount > 0 ?
                      (TOTAL_PRICE_WITH_VAT - (TOTAL_PRICE_WITH_VAT * discount) / 100) :
                      TOTAL_PRICE_WITH_VAT).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* pay now */}
            <div className="pay-now">
              <button type="click" className="btnActive" onClick={(e) => handlePayNow(e)}>pay now</button>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
}

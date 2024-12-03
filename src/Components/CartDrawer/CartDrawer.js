import "./CartDrawer.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cartItems);
  const totalPrice = useSelector((state) => state.totalPrice);
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const [existItems, setExistItems] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const cartDrawer = document.getElementById("CartDrawer");
      const cart = document.getElementById("cart");
      if (
        cartDrawer &&
        cart &&
        !cartDrawer.contains(e.target) &&
        !cart.contains(e.target)
      ) {
        cartDrawer.classList.add("close");
        cartDrawer.classList.remove("open");
      }
    };

    document.addEventListener("click", handleClickOutside);
  }, []);

  const handleRemoveItem = (recipe) => {
    let singleRecipe = document.getElementById(`recipe_${recipe.id}`);
    handleLoader(`#delete-recipe_${recipe.id}`);
    singleRecipe.classList.add("disabled");
    setTimeout(() => {
      singleRecipe.classList.add("removed");
      setTimeout(() => {
        singleRecipe.classList.remove("removed");
        singleRecipe.classList.remove("disabled");
      }, 100);
      dispatch({ type: "REMOVE_ITEM", payload: recipe });
    }, 1000);
  };

  const handleIncrement = (recipe) => {
    dispatch({ type: "INCREMENT_ITEM", payload: recipe });
  };

  const handleDecrement = (recipe) => {
    dispatch({ type: "DECREMENT_ITEM", payload: recipe });
  };

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
    setExistItems(
      cartItems.length > 0 && location.pathname !== "/checkout" ? true : false
    );
  }, [cartItems, location]);

  return (
    <div className="CartDrawer close" id="CartDrawer">
      <div className="cart-content">
        <div className="head">
          <span>your orders</span>
          <i className="fas fa-cart-shopping"></i>
        </div>

        <p className="count-dishes">
          <span>{totalQuantity}</span> dishes
        </p>

        {!cartItems.length > 0 && (
          <h3 className="cart-empty">'The cart is empty'</h3>
        )}

        <div className="content">
          <div className="cart-recipes">
            <div className="recipes">
              {cartItems.map((recipe, index) => (
                <div className="recipe" id={`recipe_${recipe.id}`} key={index}>
                  <div className="img">
                    <img
                      src={require(`../../${recipe.image}`)}
                      alt={recipe.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="text">
                    <div className="name">{recipe.name}</div>

                    <div className="price">
                      price: <span>${recipe.price.toFixed(2)}</span>
                    </div>

                    <div className="total">
                      total:
                      <span>
                        ${(recipe.price * recipe.quantity).toFixed(2)}
                      </span>
                      to
                      <span>{recipe.quantity}s</span>
                    </div>
                  </div>

                  <div className="action">
                    <button
                      className="deleteItem btnActive"
                      id={`delete-recipe_${recipe.id}`}
                      onClick={() => handleRemoveItem(recipe)}
                    >
                      <i className="fas fa-trash-can"></i>
                    </button>

                    <div className="quantity">
                      <span
                        className="btnActive"
                        onClick={() => handleDecrement(recipe)}
                      >
                        <b>-</b>
                      </span>
                      <span
                        className="btnActive"
                        onClick={() => handleIncrement(recipe)}
                      >
                        <b>+</b>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="actions">
            {cartItems.length > 0 && (
              <div className="totalAllRecipe">
                <strong>total:</strong>
                <span> ${totalPrice.toFixed(2)}</span>
              </div>
            )}

            <div className="btns">
              {existItems && (
                <button
                  className="checkOut btnActive"
                  onClick={() => handleLoader(".checkOut")}
                >
                  checkout
                  <i className="fas fa-money-check-dollar"></i>
                </button>
              )}

              <button
                className="closeCart btnActive"
                onClick={() => handleLoader(".closeCart")}
              >
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

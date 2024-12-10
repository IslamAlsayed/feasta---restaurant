import { createStore } from "redux";
import { CART_HELPER } from "./helper";
const added = new Audio(require("../Assets/Sounds/add.mp3"));
added.volume = 0.015;

const removed = new Audio(require("../Assets/Sounds/remove.m4a"));
removed.volume = 0.02;

// Initial state
const initialState = {
  CART: CART_HELPER,
  TOTAL_PRICE: 0,
  TOTAL_QUANTITY: 0,
}

// Main function
const cartReducer = (state = initialState, action) => {
  if (localStorage.getItem("cartItems")) {
    state.CART = state.CART.filter((recipe) => recipe.id !== 0);
  }

  switch (action.type) {
    case "ADD_ITEM":
      // Check if the item is already in the cart
      const isItemExisting = state.CART.findIndex((item) => item.id === action.payload.id);

      let updatedCartAdd;

      if (isItemExisting >= 0) {
        const updatedItem = { ...state.CART[isItemExisting], quantity: state.CART[isItemExisting].quantity + 1 };

        updatedCartAdd = [...state.CART.slice(0, isItemExisting), updatedItem, ...state.CART.slice(isItemExisting + 1)];
      } else {
        action.payload.quantity = 1;
        updatedCartAdd = [...state.CART, action.payload];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartAdd));

      return {
        ...state,
        CART: updatedCartAdd,
        TOTAL_PRICE: calculateTotalPrice(updatedCartAdd),
        TOTAL_QUANTITY: calculateTotalQuantity(updatedCartAdd),
      };

    case "REMOVE_ITEM":
      const updatedCartRemove = state.CART.filter((item) => item.id !== action.payload);

      // removed.play();
      localStorage.setItem("cartItems", JSON.stringify(updatedCartRemove));

      return {
        ...state,
        CART: updatedCartRemove,
        TOTAL_PRICE: calculateTotalPrice(updatedCartRemove),
        TOTAL_QUANTITY: calculateTotalQuantity(updatedCartRemove),
      };

    case "INCREMENT_ITEM":
      const incrementedItems = state.CART.map((cartRecipe) =>
        cartRecipe.id === action.payload.id
          ? { ...cartRecipe, quantity: cartRecipe.quantity + 1 }
          : cartRecipe
      );

      // added.play();
      localStorage.setItem("cartItems", JSON.stringify(incrementedItems));

      return {
        ...state,
        CART: incrementedItems,
        TOTAL_PRICE: calculateTotalPrice(incrementedItems),
        TOTAL_QUANTITY: calculateTotalQuantity(incrementedItems),
      };

    case "DECREMENT_ITEM":
      const decrementedItems = state.CART.map((cartRecipe) =>
        cartRecipe.id === action.payload.id
          ? { ...cartRecipe, quantity: Math.max(cartRecipe.quantity - 1, 1) }
          : cartRecipe
      );

      // removed.play();
      localStorage.setItem("cartItems", JSON.stringify(decrementedItems));

      return {
        ...state,
        CART: decrementedItems,
        TOTAL_PRICE: calculateTotalPrice(decrementedItems),
        TOTAL_QUANTITY: calculateTotalQuantity(decrementedItems),
      };

    case "RESET_CART":
      localStorage.setItem("cartItems", JSON.stringify([]));

      return { ...state, CART: [], TOTAL_PRICE: 0, TOTAL_QUANTITY: 0 };
    default:
      return state;
  }
};

// helper function
const calculateTotalPrice = (cart) => {
  let cachedShipping = parseFloat(sessionStorage.getItem("cachedShipping")) || 0;
  return cart.reduce((total, item) => total + item.price * item.quantity, 0) + cachedShipping;
};

const calculateTotalQuantity = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Set total [ price,quantity ] with open site
initialState.TOTAL_PRICE = calculateTotalPrice(initialState.CART);
initialState.TOTAL_QUANTITY = calculateTotalQuantity(initialState.CART);

// Create the Redux store and export it
const store = createStore(cartReducer);

export default store;

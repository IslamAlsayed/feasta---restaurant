import { createStore } from "redux";

// Initial state
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalPrice: 0,
  totalQuantity: 0,
};

// Main function
const cartReducer = (state = initialState, action) => {
  if (localStorage.getItem("cartItems")) {
    state.cartItems = state.cartItems.filter((recipe) => recipe.id !== 0);
  }

  switch (action.type) {
    case "ADD_ITEM":
      const added = new Audio(require("../Assets/Sounds/add.mp3"));
      added.volume = 0.015;
      added.play();

      // Check if the item is already in the cart
      const isItemExisting = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedCartAdd;

      if (isItemExisting >= 0) {
        const updatedItem = {
          ...state.cartItems[isItemExisting],
          quantity: state.cartItems[isItemExisting].quantity + 1,
        };

        updatedCartAdd = [
          ...state.cartItems.slice(0, isItemExisting),
          updatedItem,
          ...state.cartItems.slice(isItemExisting + 1),
        ];
      } else {
        action.payload.vat = 0.1;
        action.payload.quantity = 1;
        updatedCartAdd = [...state.cartItems, action.payload];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cartItems: updatedCartAdd,
        totalPrice: calculateTotalPrice(updatedCartAdd),
        totalQuantity: calculateTotalQuantity(updatedCartAdd),
      };

    case "REMOVE_ITEM":
      const removed = new Audio(require("../Assets/Sounds/remove.m4a"));
      removed.volume = 0.02;
      removed.play();

      const updatedCartRemove = state.cartItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartRemove));
      return {
        ...state,
        cartItems: updatedCartRemove,
        totalPrice: calculateTotalPrice(updatedCartRemove),
        totalQuantity: calculateTotalQuantity(updatedCartRemove),
      };

    case "INCREMENT_ITEM":
      const increment = new Audio(require("../Assets/Sounds/add.mp3"));
      increment.volume = 0.015;
      increment.play();

      const incrementedItems = state.cartItems.map((cartRecipe) =>
        cartRecipe.id === action.payload.id
          ? { ...cartRecipe, quantity: cartRecipe.quantity + 1 }
          : cartRecipe
      );
      localStorage.setItem("cartItems", JSON.stringify(incrementedItems));
      return {
        ...state,
        cartItems: incrementedItems,
        totalPrice: calculateTotalPrice(incrementedItems),
        totalQuantity: calculateTotalQuantity(incrementedItems),
      };

    case "DECREMENT_ITEM":
      const decrement = new Audio(require("../Assets/Sounds/remove.m4a"));
      decrement.volume = 0.015;
      decrement.play();

      const decrementedItems = state.cartItems.map((cartRecipe) =>
        cartRecipe.id === action.payload.id
          ? { ...cartRecipe, quantity: Math.max(cartRecipe.quantity - 1, 1) }
          : cartRecipe
      );
      localStorage.setItem("cartItems", JSON.stringify(decrementedItems));
      return {
        ...state,
        cartItems: decrementedItems,
        totalPrice: calculateTotalPrice(decrementedItems),
        totalQuantity: calculateTotalQuantity(decrementedItems),
      };

    case "RESET_CART":
      localStorage.setItem("cartItems", JSON.stringify([]));

      return { ...state, cartItems: [], totalPrice: 0, totalQuantity: 0 };
    default:
      return state;
  }
};

// Helper functions
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce(
    (total, recipe) => total + recipe.price * recipe.quantity,
    0
  );
};

const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, recipe) => total + recipe.quantity, 0);
};

// Set total [ price, quantity ] with open site
initialState.totalPrice = calculateTotalPrice(initialState.cartItems);
initialState.totalQuantity = calculateTotalQuantity(initialState.cartItems);

// Create the Redux store and export it
const store = createStore(cartReducer);

export default store;

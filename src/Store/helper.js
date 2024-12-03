import Cookies from "js-cookie";
import { addData, updateData } from "../axiosConfig/API";

export let WAYSEAT = [
    { id: 1, key: "delivery", title: "delivery", icon: "fa-truck-fast", active: true },
    { id: 2, key: "pick-up", title: "pick up", icon: "fa-box", active: true }
];

export let WAYSPAY = [
    { id: 1, key: "cash", title: "cash", icon: "fa-sack-dollar", active: true },
    { id: 2, key: "wallet", title: "wallet", icon: "fa-wallet", active: false },
    { id: 2, key: "bank", title: "bank", icon: "fa-cube", active: false },
];

export let CART_HELPER = JSON.parse(localStorage.getItem("cartItems")) || [];
// export let USER = JSON.parse(Cookies.get("feasta_admin")) || [];

// const dbCart = async (item) => {
//     try {
//         let result;

//         if (!localStorage.getItem("order_code")) {
//             result = await addData("cart", { items: JSON.stringify([item]), client_id: USER.id, status: "add" });
//             if (result.status === 200) {
//                 localStorage.setItem("cartItems", result.data.items);
//                 localStorage.setItem("order_code", result.data.order_code);
//             }
//         } else {
//             result = await updateData(`cart/${USER.id}/${localStorage.getItem("order_code")}`, { items: JSON.stringify([item]), client_id: USER.id, status: "update" });
//         }
//     } catch (error) {
//         console.log(error.response || error.message)
//     }
// }

export const ADD_ITEM_HELPER = (recipe, dispatch) => {
    let newItem = {
        id: recipe.id ?? 0,
        title: recipe.title ?? "null",
        image: recipe.image ?? "null",
        price: parseFloat(recipe.price) ?? 0,
        quantity: recipe.quantity ?? 0,
        vat: recipe.vat ?? 0,
    };

    let Header = document.getElementById("Header");
    if (Header) Header.style.transform = "translateY(0)";

    // dbCart(newItem)

    setTimeout(() => {
        let cartCount = document.getElementById("cart");
        if (cartCount) {
            cartCount.classList.add("added");
            setTimeout(() => cartCount.classList.remove("added"), 140);
        }
        dispatch({ type: "ADD_ITEM", payload: newItem });
    }, 250);
}

export const REMOVE_ITEM_HELPER = (recipeId, dispatch) => {
    let singleRecipe = document.querySelector(`#CartDrawer #recipe_${recipeId}`);
    singleRecipe.classList.add("disabled");

    setTimeout(() => {
        singleRecipe.classList.add("removed");
        setTimeout(() => {
            singleRecipe.classList.remove("removed");
            singleRecipe.classList.remove("disabled");
        }, 100);
        dispatch({ type: "REMOVE_ITEM", payload: recipeId });
    }, 1000);
};

export const DECREMENT_OR_INCREMENT_HELPER = (recipe, action, dispatch) => {
    dispatch({ type: action, payload: recipe });
};
import Cookies from "js-cookie";
import { addData, updateData } from "../axiosConfig/API";
export let CART_HELPER;
export let USER_HELPER;
export let TOTAL_HELPER;
export let SITE_HELPER;

try {
    SITE_HELPER = JSON.parse(Cookies.get("feasta-site-information")) || {};
} catch (e) {
    SITE_HELPER = {};
}

try {
    CART_HELPER = JSON.parse(localStorage.getItem("cartItems")) || [];
    TOTAL_HELPER = CART_HELPER.reduce((total, item) => total + item.price * item.quantity, 0);
} catch (e) {
    CART_HELPER = [];
}

try {
    CART_HELPER = JSON.parse(localStorage.getItem("cartItems")) || [];
    TOTAL_HELPER = CART_HELPER.reduce((total, item) => total + item.price * item.quantity, 0);
} catch (e) {
    CART_HELPER = [];
}

try {
    USER_HELPER = JSON.parse(Cookies.get("feasta_client")) || {};
} catch (e) {
    USER_HELPER = {};
}

const added = new Audio(require("../Assets/Sounds/add.mp3"));
added.volume = 0.015;

const removed = new Audio(require("../Assets/Sounds/remove.m4a"));
removed.volume = 0.02;

export const ADD_ITEM_HELPER = async (recipe, dispatch) => {
    let newItem = {
        id: recipe.id ?? 0,
        title: recipe.title ?? "null",
        image: recipe.image ?? "null",
        price: parseFloat(recipe.price) ?? 0,
        quantity: recipe.quantity ?? 0,
    };

    let Header = document.getElementById("Header");
    if (Header) Header.style.transform = "translateY(0)";

    dispatch({ type: "ADD_ITEM", payload: newItem });
    added.play();

    if (USER_HELPER.id) {
        let items = JSON.parse(localStorage.getItem("cartItems")) || [];
        let order = { items: JSON.stringify(items), total: parseFloat(calculateTotalPrice(items)), client_id: USER_HELPER.id };

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
            console.log(error);
        }
    }
}

export const REMOVE_ITEM_HELPER = async (recipeId, dispatch) => {
    let singleRecipe = document.querySelector(`#CartDrawer #item_${recipeId}`);
    singleRecipe.classList.add("disabled");

    setTimeout(() => {
        singleRecipe.classList.add("removed");
        setTimeout(() => {
            singleRecipe.classList.remove("removed");
            singleRecipe.classList.remove("disabled");
            dispatch({ type: "REMOVE_ITEM", payload: recipeId });
            removed.play();
        }, 100);
    }, 100);

    if (USER_HELPER.id) {
        try {
            let items = JSON.parse(localStorage.getItem("cartItems")) || [];
            let order = { items: JSON.stringify(items), total: parseFloat(calculateTotalPrice(items)), client_id: USER_HELPER.id };

            let cartId = localStorage.getItem("cartId");
            let code = localStorage.getItem("code");

            if (cartId) {
                const response = await updateData(`cart/${cartId}/${code}`, order);
                if (response.status === 200) {
                    // console.log(response.result);
                } else {
                    await updateData(`cart/${cartId}/${code}`, order);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const DECREMENT_OR_INCREMENT_HELPER = async (recipe, action, dispatch) => {
    try {
        dispatch({ type: action, payload: recipe });

        if (action === 'INCREMENT_ITEM') {
            added.play();
        } else {
            removed.play();
        }

        if (USER_HELPER.id) {
            let items = JSON.parse(localStorage.getItem("cartItems")) || [];
            let order = { items: JSON.stringify(items), total: parseFloat(calculateTotalPrice(items)), client_id: USER_HELPER.id };

            let cartId = localStorage.getItem("cartId");
            let code = localStorage.getItem("code");

            if (cartId) {
                setTimeout(async () => {
                    const response = await updateData(`cart/${cartId}/${code}`, order);
                    if (response.status === 200) {
                        // console.log(response.result);
                    } else {
                        await updateData(`cart/${cartId}/${code}`, order);
                    }
                }, 1000);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const calculateTotalPrice = (items) => {
    let totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    let cachedShipping = parseFloat(sessionStorage.getItem("cachedShipping")) || 0;
    totalPrice += cachedShipping;
    return totalPrice.toFixed(2);
};

export const randomIntArrayInRange = (min, max, length = 1) => {
    return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export let WAYSEAT = [
    { id: 1, key: "delivery", title: "delivery", icon: "fa-truck-fast", active: true },
    { id: 2, key: "pick-up", title: "pick up", icon: "fa-box", active: true }
];

export let WAYSPAY = [
    { id: 1, key: "cash", title: "cash", icon: "fa-sack-dollar", active: true },
    { id: 2, key: "wallet", title: "wallet", icon: "fa-wallet", active: false },
    { id: 2, key: "bank", title: "bank", icon: "fa-cube", active: false },
];
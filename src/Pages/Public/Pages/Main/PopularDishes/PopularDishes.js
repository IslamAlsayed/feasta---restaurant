import "./PopularDishes.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData } from "../../../../../axiosConfig/API";

export default function PopularDishes() {
  const dispatch = useDispatch();
  const [dishes, setDishes] = useState([]);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("recipes");
      let recipes = result.filter((recipe) => recipe.rating >= 5);
      setDishes(recipes);
    } catch (error) {
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleAddItem = (item) => {
    let newItem = {
      id: item.id ?? 0,
      name: item.name ?? "null",
      image: item.image ?? "null",
      price: parseFloat(item.price) ?? 0,
      quantity: item.quantity ?? 0,
    };

    let cartCount = document.getElementById("cart");
    cartCount.classList.add("added");
    setTimeout(() => cartCount.classList.remove("added"), 140);
    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  return (
    <div className="PopularDishes">
      <div className="container">
        <div className="title">
          <h2>
            our <span>popular dishes</span>
          </h2>
          <div className="description">
            we are on the gas safe register and are members of the institute of
            plumbing and heading engineering
          </div>
        </div>

        <div className="dishes">
          {dishes.map(
            (dish, index) =>
              index < 6 && (
                <div className="dish" key={index}>
                  <div className="dish-img">
                    <img
                      src={require(`../../../../../${dish.image}`)}
                      alt={dish.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="dish-info">
                    <div className="title">
                      <h5>{dish.name}</h5>
                      <span>${dish.price}</span>
                    </div>
                    <p>
                      {String(dish.description).length >= 140
                        ? dish.description.slice(0, 140) + "..."
                        : dish.description}
                    </p>
                  </div>

                  <div className="action">
                    <button
                      className="btn btnActive add"
                      onClick={() => handleAddItem(dish)}
                    >
                      <i className="fa-solid fa-plus"></i>
                      order
                    </button>

                    <Link
                      to={`/recipe-details/${dish.id}`}
                      className="btn btnActive details"
                    >
                      <i className="fa-solid fa-bookmark"></i>
                      details
                    </Link>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

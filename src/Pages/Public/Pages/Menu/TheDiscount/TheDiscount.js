import "./TheDiscount.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getData, getDataById } from "../../../../../axiosConfig/API";

export default function TheDiscount() {
  const dispatch = useDispatch();
  const [recipe, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const recipes = await getData("recipes");
      const result = await getDataById(
        "recipes",
        Math.floor(Math.random() * recipes.length)
      );
      setRecipes(result);
      setLoading(true);
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

  if (!loading) return <p>loading...</p>;

  return (
    <div className="TheDiscount">
      <div className="container">
        {recipe && (
          <div className="discount">
            <div className="img">
              <img
                src={require(`../../../../../${recipe.image}`)}
                alt="offer"
                loading="lazy"
              />
            </div>

            <div className="info">
              <span>{recipe.name}</span>
              <h2>discount {"50"}%</h2>
              <p>
                {String(recipe.description).length >= 140
                  ? recipe.description.slice(0, 140) + "..."
                  : recipe.description}
              </p>
              <div className="actions">
                <button
                  className="btn btnActive btnAddOrder"
                  onClick={(recipe) => handleAddItem(recipe)}
                >
                  add order
                  <i className="fas fa-plus"></i>
                </button>
                <button className="btn btnActive">
                  show details
                  <i className="fas fa-bookmark"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

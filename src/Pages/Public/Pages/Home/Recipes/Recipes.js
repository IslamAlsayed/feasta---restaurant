import "./Recipes.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import menu from "../../../../../Assets/images/icons/main-colors/menu.png";
import daily from "../../../../../Assets/images/icons/main-colors/daily.png";
import dishes from "../../../../../Assets/images/icons/main-colors/dishes.png";
import dinner1 from "../../../../../Assets/images/icons/main-colors/dinner.png";
import menu1 from "../../../../../Assets/images/icons/white&block/menu1.png";
import { getData } from "../../../../../axiosConfig/API";

export default function Recipes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(false);
    try {
      const result = await getData("recipes");
      setRecipes(result);
      const breakfastRecipes = result.filter(
        (recipe) => recipe.mealType === "Breakfast"
      );
      setFilterRecipes(breakfastRecipes);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilter = (e) => {
    const filter = e.target.dataset.filter;
    setActiveTab(filter);

    const filterRecipes = recipes.filter(
      (recipe) => recipe.mealType === filter
    );

    setFilterRecipes([]);
    setTimeout(() => setFilterRecipes(filterRecipes), 1000);
  };

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
    <div className="Recipes">
      <div className="container">
        <div className="summery">
          <p>
            <span>discover</span> menu <br />
            choose your <span>dish from menu</span>
          </p>
        </div>

        <div className="tabs">
          {["Breakfast", "Dinner", "Lunch", "Dessert"].map((meal) => (
            <div
              key={meal}
              className={`tab ${activeTab === meal ? "active" : ""}`}
              data-filter={meal}
              onClick={handleFilter}
            >
              <img
                src={
                  meal === "Breakfast"
                    ? menu
                    : meal === "Dinner"
                    ? daily
                    : meal === "Lunch"
                    ? dishes
                    : dinner1
                }
                alt={meal}
                loading="lazy"
              />
              <span>{meal.toLowerCase()}</span>
            </div>
          ))}
        </div>

        <div className="random-recipe">
          {!Object(filterRecipes).length > 0 && (
            <div className="sky-loading">
              {Array.from({ length: 9 }).map((_, index) => (
                <div className="card" key={index}>
                  <div className="image"></div>
                  <div className="text"></div>
                  <div className="btns">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div id="cards" className="cards">
            {filterRecipes.map(
              (recipe, index) =>
                index < 9 && (
                  <div className="card" key={index}>
                    <div className="card-image">
                      <img
                        src={require(`../../../../../${recipe.image}`)}
                        className="images"
                        alt="recipe"
                        loading="lazy"
                      />
                      <span className="rating">
                        <i className="fa-solid fa-star"></i>
                        {recipe.rating}
                      </span>
                    </div>

                    <div className="card-title">
                      <span className="name">{recipe.name}</span>
                      <span className="price">${recipe.price}</span>
                    </div>

                    <div className="card-body">
                      <div className="actions">
                        <button
                          className="btn btnActive add"
                          onClick={() => handleAddItem(recipe)}
                        >
                          add order
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>

                        <Link
                          to={`/recipe-details/${recipe.id}`}
                          className="btn btnActive details"
                        >
                          details
                          <i className="fa-solid fa-bookmark"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="main-menu">
          <Link to="/all-recipes" className="btn btnActive">
            <img src={menu1} alt="link icon all recipes" loading="lazy" />
            view the full menu
          </Link>
        </div>
      </div>
    </div>
  );
}

import "./AllRecipes.css";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cooking from "../../../../Assets/images/icons/main-colors/cooking.png";
import menu from "../../../../Assets/images/icons/main-colors/menu.png";
import daily from "../../../../Assets/images/icons/main-colors/daily.png";
import dishes from "../../../../Assets/images/icons/main-colors/dishes.png";
import dinner1 from "../../../../Assets/images/icons/main-colors/dinner.png";
import { getData } from "../../../../axiosConfig/API";

export default function AllRecipes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(false);

    try {
      const result = await getData("recipes");
      setRecipes(result);
      setFilterRecipes(result);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilter = (meal) => {
    setActiveTab(meal);
    setFilterRecipes([]);
    let recipesFilter =
      meal === "All"
        ? recipes
        : recipes.filter((recipe) => recipe.mealType === meal);
    setTimeout(() => setFilterRecipes(recipesFilter), 1000);
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

  return (
    <div className="AllRecipes">
      {loading && (
        <div className="container">
          <div className="summery">
            <p>
              <span>discover</span> menu <br />
              choose your <span>dish from menu</span>
            </p>
          </div>

          {filterRecipes.length > 0 && (
            <div className="tabs">
              {["All", "Breakfast", "Dinner", "Lunch", "Dessert"].map(
                (meal) => (
                  <div
                    key={meal}
                    className={`tab ${activeTab === meal ? "active" : ""}`}
                    data-filter={meal}
                    onClick={() => handleFilter(meal)}
                  >
                    <img
                      src={
                        meal === "All"
                          ? cooking
                          : meal === "Breakfast"
                          ? dinner1
                          : meal === "Dinner"
                          ? daily
                          : meal === "Lunch"
                          ? menu
                          : dishes
                      }
                      alt={meal}
                      loading="lazy"
                    />
                    <span>{meal.toLowerCase()}</span>
                  </div>
                )
              )}
            </div>
          )}

          <div className="random-recipe">
            {!filterRecipes.length > 0 && (
              <div className="sky-loading">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div className="card" key={index}>
                    <div className="card-image"></div>

                    <div className="card-title">
                      <span></span>
                      <span></span>
                    </div>

                    <div className="card-body">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filterRecipes.length > 0 && (
              <div id="cards" className="cards">
                {filterRecipes.map((recipe, index) => (
                  <div className="card" key={index}>
                    <div className="card-image">
                      <img
                        src={require(`../../../../${recipe.image}`)}
                        className="images"
                        alt="recipe"
                        loading="lazy"
                      />
                      <span className="rating">
                        {recipe.rating}
                        <i className="fa-solid fa-star"></i>
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
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

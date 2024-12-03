import "./TabsRecipes.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../../Store/helper";
import menu from "../../../../../Assets/images/icons/main-colors/menu.png";
import daily from "../../../../../Assets/images/icons/main-colors/daily.png";
import dishes from "../../../../../Assets/images/icons/main-colors/dishes.png";
import dinner1 from "../../../../../Assets/images/icons/main-colors/dinner.png";
import { getData } from "../../../../../axiosConfig/API";

export default function TabsRecipes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("breakfast");
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(false);
    try {
      const result = await getData("recipes");
      if (result.status === 200) {
        setRecipes(result.result);
        const breakfastRecipes = result.result.filter((recipe) => recipe.mealType === "breakfast").slice(0, 9);
        setFilterRecipes(breakfastRecipes);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilter = (e) => {
    const filter = e.target.dataset.filter;
    setActiveTab(filter);

    const filterRecipes = recipes.filter((recipe) => recipe.mealType === filter).slice(0, 9);

    setFilterRecipes([]);
    setTimeout(() => setFilterRecipes(filterRecipes), 1000);
  };

  if (!loading) return;

  return (
    <div className="TabsRecipes">
      <div className="container">
        <div className="title">
          <h2>our <span>special menu</span></h2>
          <div className="description">
            we are on the gas safe register and are members of the institute of
            plumbing and heading engineering
          </div>
        </div>

        <div className="tabs">
          <Link to="/all-recipes">
            all recipes <i className="fa-solid fa-up-right-from-square"></i>
          </Link>

          {["breakfast", "dinner", "lunch", "dessert"].map((meal) => (
            <div key={meal}
              className={`tab ${activeTab === meal ? "active" : ""}`}
              data-filter={meal} onClick={handleFilter}>
              <img src={
                meal === "breakfast" ? menu : meal === "dinner"
                  ? daily : meal === "lunch" ? dishes : dinner1
              } alt={meal} loading="lazy" />
              <span>{meal.toLowerCase()}</span>
            </div>
          ))}
        </div>

        <div className="random-recipe">
          {!filterRecipes.length > 0 && (
            <div className="sky-loading">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="card" key={index}>
                  <div className="image"></div>
                  <div className="info">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cards">
            {filterRecipes.map(
              (recipe, index) =>
                <div className="card" key={index}>
                  <div className="card-image">
                    <img src={recipe.image} alt={recipe.name} loading="lazy" />
                  </div>

                  <div className="card-info">
                    <h5>{recipe.title}</h5>
                    <span>${recipe.price}</span>
                  </div>

                  <div className="rating">
                    <i className="fa-solid fa-star"></i>
                    {recipe.rating}
                  </div>

                  <div className="actions">
                    <button className="btn btnActive add" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)}>
                      <i className="fas fa-cart-plus"></i>
                    </button>
                    <Link to={`recipe-details/${recipe.id}`}
                      className="btn btnActive details">
                      <i className="fas fa-bookmark"></i>
                    </Link>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

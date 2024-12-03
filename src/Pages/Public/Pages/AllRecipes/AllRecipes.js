import "./AllRecipes.css";
import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../Store/helper";
import cooking from "../../../../Assets/images/icons/main-colors/cooking.png";
import menu from "../../../../Assets/images/icons/main-colors/menu.png";
import daily from "../../../../Assets/images/icons/main-colors/daily.png";
import dishes from "../../../../Assets/images/icons/main-colors/dishes.png";
import dinner1 from "../../../../Assets/images/icons/main-colors/dinner.png";
import { getData } from "../../../../axiosConfig/API";

export default function AllRecipes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(false);

    try {
      const result = await getData("recipes");
      if (result.status === 200) {
        setRecipes(result.result);
        setFilterRecipes(result.result);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleFilter = (meal) => {
    setActiveTab(meal);
    setFilterRecipes([]);
    let recipesFilter =
      meal === "all"
        ? recipes
        : recipes.filter((recipe) => recipe.mealType === meal);
    setTimeout(() => setFilterRecipes(recipesFilter), 1000);
  };

  return (
    <div className="AllRecipes">
      {loading && (
        <div className="container">
          <div className="summery">
            <span>discover</span> menu <br />
            choose your <span>dish from menu</span>
          </div>

          {filterRecipes.length > 0 && (
            <div className="tabs">
              {["all", "breakfast", "dinner", "lunch", "dessert"].map(
                (meal) => (
                  <div key={meal} data-filter={meal}
                    className={`tab ${activeTab === meal ? "active" : ""}`}
                    onClick={() => handleFilter(meal)} >
                    <img src={
                      meal === "all" ? cooking
                        : meal === "breakfast" ? dinner1
                          : meal === "dinner" ? daily
                            : meal === "lunch" ? menu : dishes
                    } alt={meal} loading="lazy" />
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
                      <img src={recipe.image} className="images" alt={recipe.title} loading="lazy" />
                      <span className="rating">
                        {recipe.rating}
                        <i className="fa-solid fa-star"></i>
                      </span>
                    </div>

                    <div className="card-title">
                      <span className="name">{recipe.title}</span>
                      <span className="price">${recipe.price}</span>
                    </div>

                    <div className="card-body">
                      <div className="actions">
                        <button className="btn btnActive add" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)}>
                          add order
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>

                        <Link to={`/recipe-details/${recipe.id}`} className="btn btnActive details">
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

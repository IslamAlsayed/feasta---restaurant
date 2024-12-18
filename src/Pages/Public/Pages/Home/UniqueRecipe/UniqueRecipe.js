import "./UniqueRecipe.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../../Store/helper";
import OpeningTime from "../../../../../Assets/images/other/index1/opening-time.png";
import { getData } from "../../../../../axiosConfig/API";

export default function UniqueRecipe() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipeById = useCallback(async () => {
    setLoading(false);

    try {
      const result = await getData("recipes");
      let randomNumber1 = result.result[Math.floor(Math.random() * result.result.length)];
      let randomNumber2 = result.result[Math.floor(Math.random() * result.result.length)];
      setRecipes([randomNumber1, randomNumber2]);
      setLoading(true);
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipeById();
  }, [fetchRecipeById]);

  if (!loading) return;

  return (
    <div className="UniqueRecipes">
      <div className="container">
        <div className="title">
          <h2>
            <span>chef</span> unique recipes <br />
            recipe of <span>the day</span>
          </h2>

          <div className="description">
            He lay on his armour-like back, and if he lifted his head a little
            he could see his brown belly, slightly domed and divided by arches
            into stiff sections. The bedding was hardly able to cover it and
            seemed ready.
          </div>
        </div>

        <div className="recipes">
          <div className="recipes">
            {recipes.map((recipe, index) => (
              <div className="recipe" key={index}>
                {recipe && recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} loading="lazy" />
                ) : (<p>Image not available</p>)}

                <div className="info">
                  <div className="title">
                    <h3>special</h3>
                    <div className="rate">
                      <i className="fa-solid fa-star"></i>
                      {recipe ? recipe.rating : "N/A"}
                    </div>
                  </div>
                  <div className="price">
                    <span>{recipe ? recipe.title : "N/A"}</span>
                    <span>${recipe ? recipe.price : "0.00"}</span>
                  </div>
                  <div className="description">
                    {recipe && String(recipe.description).length >= 140
                      ? recipe.description.slice(0, 70) + "..."
                      : recipe ? recipe.description : "No description available"}
                  </div>
                </div>

                <div className="actions">
                  <button className="btn btnActive add" disabled={!recipe} onClick={() => ADD_ITEM_HELPER(recipe, dispatch)}>
                    <span>add order</span>
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>

                  <Link to={`/recipe-details/${recipe.id}`} className="btn btnActive details">
                    <span>details</span>
                    <i className="fa-solid fa-bookmark"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="opening-time">
            <div className="content-main">
              <img src={OpeningTime} alt="main recipe" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

import "./PopularDishes.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../../Store/helper";
import { getData } from "../../../../../axiosConfig/API";

export default function PopularDishes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("recipes");
      if (result.status === 200) {

        result.result.sort((a, b) => {
          return parseFloat(b.rating) - parseFloat(a.rating);
        });

        let limit = result.result.slice(0, 6);

        setRecipes(limit);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (!loading) return;

  return (
    <div className="PopularDishes">
      <div className="container">
        <div className="title">
          <h2>our <span>popular dishes</span></h2>
          <div className="description">
            we are on the gas safe register and are members of the institute of
            plumbing and heading engineering
          </div>
        </div>

        <div className="dishes">
          {recipes.map(
            (recipe, index) =>
              <div className="dish" key={index}>
                <div className="dish-img">
                  <img src={recipe.image} alt={recipe.name} loading="lazy" />
                </div>

                <div className="dish-info">
                  <div className="title">
                    <h5>{recipe.title}</h5>
                    <span>${recipe.price}</span>
                  </div>
                  <p>
                    {String(recipe.description).length >= 140
                      ? recipe.description.slice(0, 140) + "..."
                      : recipe.description}
                  </p>
                </div>

                <div className="action">
                  <button className="btn btnActive add" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)}>
                    <i className="fa-solid fa-plus"></i>
                    order
                  </button>

                  <Link to={`/recipe-details/${recipe.id}`} className="btn btnActive details">
                    <i className="fa-solid fa-bookmark"></i>
                    details
                  </Link>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

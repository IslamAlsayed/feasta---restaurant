import "./TheDiscount.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../../Store/helper";
import { getData } from "../../../../../axiosConfig/API";

export default function TheDiscount() {
  const dispatch = useDispatch();
  const [recipe, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("offers/1");
      if (result.status === 200) {
        setRecipes(result.result);
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
    <div className="TheDiscount">
      <div className="container">
        {recipe && (
          <div className="discount">
            <div className="image">
              <img src={recipe.menu?.image} alt={recipe.menu?.title} loading="lazy" />
            </div>

            <div className="info">
              <span>{recipe.menu?.title}</span>
              <h2>discount {recipe.discount}%</h2>
              <p>
                {String(recipe.description).length >= 140
                  ? recipe.description.slice(0, 140) + "..."
                  : recipe.description}
              </p>
              <div className="actions">
                <button className="btn btnActive btnAddOrder" onClick={(recipe) => ADD_ITEM_HELPER(recipe, dispatch)}>
                  add order
                  <i className="fas fa-plus"></i>
                </button>

                <Link to={`/recipe-details/${recipe.menu?.id}`} className="btn btnActive details">
                  show details
                  <i className="fas fa-bookmark"></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

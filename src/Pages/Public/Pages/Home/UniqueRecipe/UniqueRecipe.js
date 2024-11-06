import "./UniqueRecipe.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OpeningTime from "../../../../../Assets/images/other/index1/opening-time.png";
import { getData, getDataById } from "../../../../../axiosConfig/API";
import { useDispatch } from "react-redux";

export default function UniqueRecipe() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipeById = useCallback(async () => {
    setLoading(false);

    try {
      const result = await getData("recipes");
      let randomNumber1 = Math.floor(Math.random() * result.length);
      let randomNumber2 = Math.floor(Math.random() * result.length);
      const result1 = await getDataById("recipes", randomNumber1);
      const result2 = await getDataById("recipes", randomNumber2);
      setRecipes([result1, result2]);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchRecipeById();
  }, [fetchRecipeById]);

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
                  <img
                    src={require(`../../../../../${recipe.image}`)}
                    alt="recipe"
                    loading="lazy"
                  />
                ) : (
                  <p>Image not available</p>
                )}

                <div className="info">
                  <div className="title">
                    <h3>special</h3>
                    <div className="rate">
                      {recipe ? recipe.rating : "N/A"}
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="price">
                    <span>{recipe ? recipe.name : "N/A"}</span>
                    <span>${recipe ? recipe.price : "0.00"}</span>
                  </div>
                  <div className="description">
                    {recipe && String(recipe.description).length >= 140
                      ? recipe.description.slice(0, 140) + "..."
                      : recipe
                      ? recipe.description
                      : "No description available"}
                  </div>
                </div>

                <div className="actions">
                  <button
                    className="btn btnActive add"
                    onClick={() => handleAddItem(recipe)}
                    disabled={!recipe} // تعطيل الزر إذا كانت recipe غير موجودة
                  >
                    <span>add order</span>
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>

                  <Link
                    to={`/recipe-details/${recipe ? recipe.id : ""}`}
                    className="btn btnActive details"
                    onClick={(e) => {
                      if (!recipe) e.preventDefault();
                    }} // منع التنقل إذا كانت recipe غير موجودة
                  >
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
    </div>
  );
}

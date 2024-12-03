import "./TheStarters.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../../Store/helper";
import dishMain from "../../../../../Assets/images/dishes/dishMain.jpg";
import salads from "../../../../../Assets/images/dishes/salads.png";
import dessert1 from "../../../../../Assets/images/dishes/dessert1.png";
import menu1 from "../../../../../Assets/images/icons/white&block/menu1.png";
import { getData } from "../../../../../axiosConfig/API";

export default function TheStarters() {
  const dispatch = useDispatch();
  const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [dessert, setDessert] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("recipes");
      if (result.status === 200) {
        const breakfast = result.result.filter((recipe) => recipe.mealType === "breakfast").slice(0, 3);
        setBreakfast(breakfast);

        const dinner = result.result.filter((recipe) => recipe.mealType === "dinner").slice(0, 3);
        setDinner(dinner);

        const dessert = result.result.filter((recipe) => recipe.mealType === "dessert").slice(0, 3);
        setDessert(dessert);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div className="TheStarters">
      <div className="container">
        <section className="starters starters1">
          <div className="title">
            <h2>breakfast</h2>
          </div>

          <div className="starters">
            <div className="starters-img">
              <img src={dishMain} alt="breakfast recipe" loading="lazy" />
            </div>

            <div className="cards">
              {!loading &&
                <div className="sky-loading">
                  {[1, 2, 3].map((_, index) => (
                    <div className="card" key={index}>
                      <div className="card-img"></div>
                      <div className="card-info">
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ))}
                </div>
              }

              {loading && breakfast.map(
                (recipe, index) =>
                  <div className="card" key={index}>
                    <div className="card-img">
                      <img src={recipe.image} alt={recipe.title} loading="lazy" />
                    </div>

                    <div className="card-info">
                      <div className="title">
                        {recipe.title} <span>${recipe.price}</span>
                      </div>
                      <div className="description">
                        {String(recipe.description).length >= 30
                          ? recipe.description.slice(0, 30) + "..."
                          : recipe.description}
                      </div>
                    </div>

                    <div className="actions">
                      <button className="add btnAddOrder" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)}>
                        <i className="fas fa-cart-plus"></i>
                      </button>
                      <Link to={`/recipe-details/${recipe.id}`} className="btn btnActive details">
                        <i className="fas fa-bookmark"></i>
                      </Link>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </section>

        <section className="starters starters2">
          <div className="title">
            <h2>dinner</h2>
          </div>

          <div className="starters">
            <div className="cards">
              {!loading &&
                <div className="sky-loading">
                  {[1, 2, 3].map((_, index) => (
                    <div className="card" key={index}>
                      <div className="card-img"></div>
                      <div className="card-info">
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ))}
                </div>
              }

              {loading && dinner.map(
                (recipe, index) =>
                  <div className="card" key={index}>
                    <div className="card-img">
                      <img src={recipe.image} alt={recipe.title} loading="lazy" />
                    </div>

                    <div className="card-info">
                      <div className="title">
                        {recipe.title} <span>${recipe.price}</span>
                      </div>
                      <div className="description">
                        {String(recipe.description).length >= 30
                          ? recipe.description.slice(0, 30) + "..."
                          : recipe.description}
                      </div>
                    </div>

                    <div className="actions">
                      <button className="add btnAddOrder" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)} >
                        <i className="fas fa-cart-plus"></i>
                      </button>
                      <Link to={`/recipe-details/${recipe.id}`} className="btn btnActive details">
                        <i className="fas fa-bookmark"></i>
                      </Link>
                    </div>
                  </div>
              )}
            </div>

            <div className="starters-img">
              <img src={salads} alt="dinner recipe" />
            </div>
          </div>
        </section>

        <section className="starters starters3">
          <div className="title">
            <h2>dessert</h2>
          </div>

          <div className="starters">
            <div className="starters-img">
              <img src={dessert1} alt="dessert recipe" />
            </div>

            <div className="cards">
              {!loading &&
                <div className="sky-loading">
                  {[1, 2, 3].map((_, index) => (
                    <div className="card" key={index}>
                      <div className="card-img"></div>
                      <div className="card-info">
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ))}
                </div>
              }

              {loading && dessert.map(
                (recipe, index) =>
                  <div className="card" key={index}>
                    <div className="card-img">
                      <img src={recipe.image} alt={recipe.title} loading="lazy" />
                    </div>

                    <div className="card-info">
                      <div className="title">
                        {recipe.title} <span>${recipe.price}</span>
                      </div>
                      <div className="description">
                        {String(recipe.description).length >= 30
                          ? recipe.description.slice(0, 30) + "..."
                          : recipe.description}
                      </div>
                    </div>

                    <div className="actions">
                      <button className="add btnAddOrder" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)} >
                        <i className="fas fa-cart-plus"></i>
                      </button>
                      <Link to={`/recipe-details/${recipe.id}`} className="btn btnActive details">
                        <i className="fas fa-bookmark"></i>
                      </Link>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </section>

        <div className="full-menu">
          <Link to="/all-recipes" className="btn btn-main">
            <img src={menu1} alt="link icon all recipes" loading="lazy" />
            view the full menu
          </Link>
        </div>
      </div>
    </div>
  );
}

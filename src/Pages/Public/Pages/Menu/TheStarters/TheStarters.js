import "./TheStarters.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dishMain from "../../../../../Assets/images/dishes/dishMain.jpg";
import salads from "../../../../../Assets/images/dishes/salads.png";
import dessert1 from "../../../../../Assets/images/dishes/dessert1.png";
import menu1 from "../../../../../Assets/images/icons/white&block/menu1.png";
import { getData } from "../../../../../axiosConfig/API";
import { Link } from "react-router-dom";

export default function TheStarters() {
  const dispatch = useDispatch();
  const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [dessert, setDessert] = useState([]);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("recipes");

      const breakfast = result.filter(
        (recipe) => recipe.mealType === "Breakfast"
      );
      setBreakfast(breakfast);
      const dinner = result.filter((recipe) => recipe.mealType === "Dinner");
      setDinner(dinner);
      const dessert = result.filter((recipe) => recipe.mealType === "Dessert");
      setDessert(dessert);
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
              {breakfast.map(
                (recipe, index) =>
                  index < 3 && (
                    <div className="card" key={index}>
                      <div className="card-img">
                        <img
                          src={require(`../../../../../${recipe.image}`)}
                          alt="recipe"
                          loading="lazy"
                        />
                      </div>

                      <div className="card-info">
                        <div className="title">
                          {recipe.name} <span>${recipe.price}</span>
                        </div>
                        <div className="description">
                          {String(recipe.description).length >= 30
                            ? recipe.description.slice(0, 30) + "..."
                            : recipe.description}
                        </div>
                      </div>

                      <div className="actions">
                        <button
                          className="add btnAddOrder"
                          onClick={() => handleAddItem(recipe)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <button className="details">
                          <i className="fas fa-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  )
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
              {dinner.map(
                (recipe, index) =>
                  index < 3 && (
                    <div className="card" key={index}>
                      <div className="card-img">
                        <img
                          src={require(`../../../../../${recipe.image}`)}
                          alt="recipe"
                          loading="lazy"
                        />
                      </div>

                      <div className="card-info">
                        <div className="title">
                          {recipe.name} <span>${recipe.price}</span>
                        </div>
                        <div className="description">
                          {String(recipe.description).length >= 30
                            ? recipe.description.slice(0, 30) + "..."
                            : recipe.description}
                        </div>
                      </div>

                      <div className="actions">
                        <button
                          className="add btnAddOrder"
                          onClick={() => handleAddItem(recipe)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <button className="details">
                          <i className="fas fa-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  )
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
              {dessert.map(
                (recipe, index) =>
                  index < 3 && (
                    <div className="card" key={index}>
                      <div className="card-img">
                        <img
                          src={require(`../../../../../${recipe.image}`)}
                          alt="recipe"
                          loading="lazy"
                        />
                      </div>

                      <div className="card-info">
                        <div className="title">
                          {recipe.name} <span>${recipe.price}</span>
                        </div>
                        <div className="description">
                          {String(recipe.description).length >= 30
                            ? recipe.description.slice(0, 30) + "..."
                            : recipe.description}
                        </div>
                      </div>

                      <div className="actions">
                        <button
                          className="add btnAddOrder"
                          onClick={() => handleAddItem(recipe)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <button className="details">
                          <i className="fas fa-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  )
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

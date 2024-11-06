import "./WeekMenu.css";
import React, { useCallback, useEffect, useState } from "react";
import Chef from "../../../../../Assets/images/cheffs/cheff3.png";
import { getData } from "../../../../../axiosConfig/API";

export default function WeekMenu() {
  const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("recipes");
      const breakfast = result.filter(
        (recipe) => recipe.mealType === "Breakfast"
      );
      setBreakfast(breakfast);
      const dinner = result.filter((recipe) => recipe.mealType === "Dinner");
      setDinner(dinner);
      setLoading(true);
    } catch (error) {
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (!loading) return <p>loading...</p>;

  return (
    <div className="WeekMenu">
      <div className="container">
        <div className="title">
          <h2>
            <span>week</span> specials <br />
            our <span>specials menu</span>
          </h2>
        </div>

        <div className="menu-content">
          <div className="info">
            <span>- breakfast</span>

            {breakfast.map(
              (recipe, index) =>
                index < 3 && (
                  <div className="item" key={index}>
                    <div>
                      <span>{recipe.name}</span>
                      <span>${recipe.price}</span>
                    </div>

                    <p>
                      {String(recipe.description).length >= 70
                        ? recipe.description.slice(0, 70) + "..."
                        : recipe.description}
                    </p>
                  </div>
                )
            )}
          </div>

          <div className="img">
            <img src={Chef} alt="chef" loading="lazy" />
          </div>

          <div className="info">
            <span>- dinner</span>

            {dinner.map(
              (recipe, index) =>
                index < 3 && (
                  <div className="item" key={index}>
                    <div>
                      <span>{recipe.name}</span> <span>${recipe.price}</span>
                    </div>

                    <p>
                      {String(recipe.description).length >= 70
                        ? recipe.description.slice(0, 70) + "..."
                        : recipe.description}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

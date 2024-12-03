import "./WeekMenu.css";
import React, { useCallback, useEffect, useState } from "react";
import Chef from "../../../../../Assets/images/chefs/chef3.png";
import { getData } from "../../../../../axiosConfig/API";

export default function WeekMenu() {
  const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("recipes");
      if (result.status === 200) {
        const breakfast = result.result.filter((recipe) => recipe.mealType === "breakfast").slice(0, 3);
        setBreakfast(breakfast);

        const dinner = result.result.filter((recipe) => recipe.mealType === "dinner").slice(0, 3);
        setDinner(dinner);
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
                <div className="item" key={index}>
                  <div>
                    <span>{recipe.title}</span>
                    <span>${recipe.price}</span>
                  </div>

                  <p>
                    {String(recipe.description).length >= 50
                      ? recipe.description.slice(0, 50) + "..."
                      : recipe.description}
                  </p>
                </div>
            )}
          </div>

          <div className="img">
            <img src={Chef} alt="chef" loading="lazy" />
          </div>

          <div className="info">
            <span>- dinner</span>

            {dinner.map(
              (recipe, index) =>
                <div className="item" key={index}>
                  <div>
                    <span>{recipe.title}</span>
                    <span>${recipe.price}</span>
                  </div>

                  <p>
                    {String(recipe.description).length >= 50
                      ? recipe.description.slice(0, 50) + "..."
                      : recipe.description}
                  </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

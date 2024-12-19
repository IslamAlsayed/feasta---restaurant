import "./TabsRecipes.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../../../../axiosConfig/API";
import TabsRecipes2 from "../../../../../Components/TabsRecipes/TabsRecipes";
import Recipe from "../../../../../Components/Recipe/Recipe";

export default function TabsRecipes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
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

        {filterRecipes.length > 0 && <TabsRecipes2 data={recipes} setFilterRecipes={setFilterRecipes} />}

        <div className="random-recipe">
          {!filterRecipes.length > 0 && (
            <div className="sky-loading">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="card" key={index}>
                  <div className="image"></div>
                  <div className="info"><div></div><div></div></div>
                </div>))}
            </div>)}

          <div id="recipes" className="recipes">
            {filterRecipes.map((recipe, index) => <Recipe key={index} data={recipe} dispatch={dispatch} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

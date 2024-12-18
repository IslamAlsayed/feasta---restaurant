import "./Recipes.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData } from "../../../../../axiosConfig/API";
import menu1 from "../../../../../Assets/images/icons/white&block/menu1.png";
import Recipe from "../../../../../Components/Recipe/Recipe";
import TabsRecipes from "../../../../../Components/TabsRecipes/TabsRecipes";

export default function Recipes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [stateLength, setStateLength] = useState(9);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async (stateLength) => {
    setLoading(false);
    try {
      const result = await getData("recipes");
      if (result.status === 200) {
        setRecipes(result.result);
        const breakfastRecipes = result.result.filter((recipe) => recipe.mealType === "breakfast").slice(0, stateLength);
        setFilterRecipes(breakfastRecipes);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipes(stateLength);
  }, [fetchRecipes, stateLength]);

  useEffect(() => {
    const handleResize = () => setStateLength(window.innerWidth <= 768 ? 3 : window.innerWidth <= 992 ? 6 : 9);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!loading) return;

  return (
    <div className="Recipes">
      <div className="container">
        <div className="summery">
          <span>discover</span> menu <br />
          choose your <span>dish from menu</span>
        </div>

        {filterRecipes.length > 0 && <TabsRecipes data={recipes} setFilterRecipes={setFilterRecipes} />}

        <div className="random-recipe">
          {!Object(filterRecipes).length > 0 && (
            <div className="sky-loading">
              {Array.from({ length: stateLength }).map((_, index) => (
                <div className="card" key={index}>
                  <div className="image"></div>
                  <div className="text"></div>
                  <div className="btns">
                    <div></div>
                    <div></div>
                  </div>
                </div>))}
            </div>)}

          <div id="recipes" className="recipes">
            {filterRecipes.map((recipe, index) => <Recipe key={index} data={recipe} dispatch={dispatch} />)}
          </div>
        </div>

        <div className="main-menu">
          <Link to="/all-recipes" className="btn btnActive">
            <img src={menu1} alt="link icon all recipes" loading="lazy" />
            view the full menu
          </Link>
        </div>
      </div>
    </div>
  );
}

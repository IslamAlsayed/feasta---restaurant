import "./AllRecipes.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../../../axiosConfig/API";
import Recipe from "../../../../Components/Recipe/Recipe";
import TabsRecipes from "../../../../Components/TabsRecipes/TabsRecipes";
import SearchBar from "../../../../Components/SearchBar/SearchBar";

export default function AllRecipes() {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    // setLoading(false);

    try {
      const result = await getData("recipes");
      if (result.status === 200) {
        setRecipes(result.result);
        setFilterRecipes(result.result);
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
    <div className="AllRecipes">
      <div className="container">
        <div className="summery">
          <span>discover</span> menu <br />
          choose your <span>dish from menu</span>
        </div>

        <SearchBar data={recipes} setFilterRecipes={setFilterRecipes} />

        {filterRecipes.length > 0 && <TabsRecipes data={recipes} setFilterRecipes={setFilterRecipes} />}

        <div className="random-recipe">
          {!filterRecipes.length > 0 && (
            <div className="sky-loading">
              {Array.from({ length: 9 }).map((_, index) => (
                <div className="card" key={index}>
                  <div className="card-image"></div>
                  <div className="card-title"><span></span><span></span></div>
                  <div className="card-body"><div></div><div></div></div>
                </div>))}
            </div>)}

          {filterRecipes.length > 0 && (
            <div id="recipes" className="recipes">
              {filterRecipes.map((recipe, index) => <Recipe key={index} data={recipe} dispatch={dispatch} />)}
            </div>)}
        </div>
      </div>
    </div>
  );
}

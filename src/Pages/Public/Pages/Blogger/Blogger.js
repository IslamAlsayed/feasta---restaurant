import "./Blogger.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../../../../axiosConfig/API";
import { isAuth } from "../../../../axiosConfig/Auth";
import Article from "../../../../Components/Article/Article";
import SearchBar from "../../../../Components/SearchBar/SearchBar";

export default function Blogger() {
  const location = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuth();
      if (authStatus === false) navigate("/");
    }
    checkAuth();
  }, [location, navigate]);

  const fetchArticles = useCallback(async () => {
    setLoading(false);

    try {
      const result = await getData("articles");

      if (result.status === 200) {
        setArticles(result.result);
        setFilterRecipes(result.result);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (!loading) return;

  return (
    <div className="AllArticles">
      <div className="container">
        <div className="summery">
          <span>discover</span> articles <br />
          from <span>our blog</span>
        </div>

        <SearchBar data={articles} setFilterRecipes={setFilterRecipes} />

        <div className="random-article">
          {!filterRecipes.length > 0 && (
            <div className="sky-loading">
              {Array.from({ length: 9 }).map((_, index) => (
                <div className="card" key={index}>
                  <div className="card-image"></div>
                  <div className="card-title"><span></span><span></span></div>
                  <div className="card-body"><div></div><div></div></div>
                </div>))}
            </div>)}

          {filterRecipes.length > 0 &&
            <div id="articles" className="articles">
              {filterRecipes.map((article, index) => <Article key={index} data={article} setArticles={setArticles} />)}
            </div>}
        </div>
      </div>
    </div>
  );
}

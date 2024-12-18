import "./LatestNews.css";
import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../../../../../axiosConfig/API";

export default function LatestNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async () => {
    try {
      const result = await getData("articles");

      if (result.status === 200) {
        result.result.map(article => {
          article['likeCount'] = article.article_comments.reduce((total, comment) => {
            return comment.like === 1 ? total + 1 : total;
          }, 0);
        });

        setArticles(result.result)
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
    <div className="LatestNews">
      <div className="container">
        <div className="title">
          <h2>
            <span>latest</span> news from <span>blog</span>
          </h2>

          <div className="description">
            he lay on his armour-like back, and if he lifed his head a little he
            could his belly. slightly domed and divided by arches into stiff
            sections. the bedding was hardly able to cover it and seemed ready.
          </div>
        </div>

        <div className="cards">
          {articles.map((article, index) => (
            index < 4 &&
            <div className={`card ${index === 1 && 'special'}`} key={index}>
              <div className="card-img">
                <img src={article.image} alt={article.title} loading="lazy" />
              </div>
              <div className="card-info">
                <small>{article.updated_at}, admin</small>
                <p>{article.title}</p>
                <p>
                  {String(article.description).length > 90
                    ? String(article.description).slice(0, 90) + "..."
                    : article.description}
                </p>
              </div>
              <div className="card-react">
                <span>
                  <i className="fa-solid fa-message"></i> {article.article_comments.length}
                </span>
                <span>
                  <i className="fa-solid fa-heart"></i> {article.likeCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

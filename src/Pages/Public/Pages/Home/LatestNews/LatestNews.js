import "./LatestNews.css";
import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../../../../../axiosConfig/API";

export default function LatestNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async () => {
    try {
      const result = await getData("articles");

      result.result.map(article => {
        article['likeCount'] = article.article_comments.reduce((total, comment) => {
          return comment.like === 1 ? total + 1 : total;
        }, 0);
      });

      if (result.status === 200) {
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

          {/* <div className="card special">
            <div className="card-img">
              <img src={React2} alt="latest new in blog" loading="lazy" />
            </div>
            <div className="card-info">
              <small>12 feb, 2018, admin</small>
              <p>the bedding was hardly</p>
              <p>
                a collection textile samples spread out on the table was a
                travel.
              </p>
            </div>
            <div className="card-react">
              <span>
                <i className="fa-solid fa-message"></i>05
              </span>
              <span>
                <i className="fa-solid fa-heart"></i>29
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={React3} alt="latest new in blog" loading="lazy" />
            </div>
            <div className="card-info">
              <small>21 mar, 2018, admin</small>
              <p>radio commercial develope</p>
              <p>
                a collection textile samples spread out on the table was a
                travel.
              </p>
            </div>
            <div className="card-react">
              <span>
                <i className="fa-solid fa-message"></i>16
              </span>
              <span>
                <i className="fa-solid fa-heart"></i>22
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={React4} alt="latest new in blog" loading="lazy" />
            </div>
            <div className="card-info">
              <small>10 apr, 2018, admin</small>
              <p>i am alone, and feel the charm</p>
              <p>
                a collection textile samples spread out on the table was a
                travel.
              </p>
            </div>
            <div className="card-react">
              <span>
                <i className="fa-solid fa-message"></i>08
              </span>
              <span>
                <i className="fa-solid fa-heart"></i>16
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

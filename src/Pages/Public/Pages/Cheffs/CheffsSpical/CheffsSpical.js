import "./CheffsSpical.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../../../../axiosConfig/API";

export default function CheffsSpical() {
  const [cheffs, setCheffs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOurChefs = useCallback(async () => {
    try {
      const result = await getData("ourChefs");
      setCheffs(result);
      setLoading(true);
    } catch (error) {
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchOurChefs();
  }, [fetchOurChefs]);

  if (!loading) return <p>loading...</p>;

  return (
    <div className="CheffsSpical">
      <div className="container">
        <div className="chefs">
          {cheffs.map((cheff, index) => (
            <div className="chef" key={index}>
              <div className="chef-img">
                <img
                  src={require(`../../../../../${cheff.image}`)}
                  alt={cheff.name}
                  loading="lazy"
                />

                <div className="boxs">
                  <div className="box box-top"></div>
                  <div className="box box-bottom"></div>
                  <div className="box box-right"></div>
                  <div className="box box-left"></div>
                </div>

                <div className="social">
                  <div className="icons">
                    {cheff.media.map((media, index) => (
                      <div className={media} key={index}>
                        <i className={`fab fa-${media}`}></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="chef-info">
                <div className="info">
                  <span>head chef</span>
                  <h2>{cheff.name}</h2>
                  <div className="description">{cheff.description}</div>
                </div>

                <div className="quote">
                  <span>" {cheff.title}</span>
                  <div className="description">{cheff.address}</div>
                </div>

                <div className="favorite-dish">
                  <p>
                    <span>favorite dish:</span> {cheff.favourate_dish}
                  </p>
                  <div>
                    <div className="favorite-img">
                      <img
                        src={require(`../../../../../${cheff.favourate_dish_image}`)}
                        alt={cheff.favourate_dish}
                        loading="lazy"
                      />
                    </div>
                    <div className="favorite-info">{cheff.information}</div>
                  </div>
                </div>
              </div>

              <div className="chef-details">
                <Link
                  to={`/single-cheff/${cheff.id}`}
                  className="btn btnActive"
                >
                  details chef
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

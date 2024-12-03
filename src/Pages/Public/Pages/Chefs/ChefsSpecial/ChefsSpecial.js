import "./ChefsSpecial.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getData } from "../../../../../axiosConfig/API";
import { isAuth } from "../../../../../axiosConfig/Auth";

export default function ChefsSpecial() {
  const location = useLocation();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const [absoluteImage, setAbsoluteImage] = useState();

  useEffect(() => {
    setUserAuth(isAuth());
  }, [location]);

  const fetchOurChefs = useCallback(async () => {
    try {
      const result = await getData("chefs");

      if (result.status === 200) {
        setChefs(result.result);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchOurChefs();
  }, [fetchOurChefs]);

  const handleAbsoluteImage = (image) => {
    setAbsoluteImage(image);
    document.body.style.overflow = 'hidden';
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#layout")) {
        setAbsoluteImage();
        document.body.style.overflow = 'visible';
      }
    });
  }, []);

  if (!loading) return;

  return (
    <div className="ChefsSpecial">
      <div className="container">
        <div className="chefs">
          {chefs.map((chef, index) => (
            <div className="chef" key={index}>
              <div className="chef-img">
                <img src={chef.image} alt={chef.name} loading="lazy" />

                <div className="boxes">
                  <div className="box box-top"></div>
                  <div className="box box-bottom"></div>
                  <div className="box box-right"></div>
                  <div className="box box-left"></div>
                </div>

                <div className="social">
                  <div className="icons">
                    {JSON.parse(chef.media).map((media, index) => {
                      if (media.type === "facebook" || media.type === "instagram") {
                        return (
                          <Link to={media.url} className="link" key={index}>
                            <i className={`fab fa-${media.type} ${media.type}`}></i>
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>

              <div className="chef-info">
                <div className="info">
                  <span>head chef</span>
                  <h2>{chef.name}</h2>
                  <div className="description">{chef.description}</div>
                </div>

                <div className="quote">
                  <span>" {chef.titleJob}</span>
                  <div className="description">"{chef.address}"</div>
                </div>

                <div className="favorite-dish">
                  <p><span>favorite dish: </span>{chef.favorite_dish}</p>
                  <div>
                    <div className="favorite-img">
                      <img src={chef.favorite_dish_image} alt={chef.favorite_dish} loading="lazy"
                        onClick={() => handleAbsoluteImage(chef.favorite_dish_image)} />

                      {absoluteImage &&
                        <div className="absolute">
                          <div className="layout" id="layout"></div>
                          <img src={absoluteImage} alt={chef.favorite_dish} />
                        </div>
                      }
                    </div>
                    <div className="favorite-info">{chef.information}</div>
                  </div>
                </div>
              </div>

              {userAuth && (
                <div className="chef-details">
                  <Link to={`/single-chef/${chef.id}`} className="btn btnActive">
                    details chef
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

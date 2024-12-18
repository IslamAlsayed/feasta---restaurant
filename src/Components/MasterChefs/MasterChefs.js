import "./MasterChefs.css";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { getData } from "../../axiosConfig/API";
import { Link } from "react-router-dom";

export default function MasterChefs() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (!loading) return;

  return (
    <div className="MasterChefs">
      <div className="container">
        <Swiper
          className="mySwiper cards"
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {chefs.map((chef, index) => (
            <SwiperSlide className="card" key={index}>
              <div className="card-info">
                <h3>{chef.name}</h3>
                <div className="description">
                  {String(chef.description).length > 140
                    ? String(chef.description).slice(0, 140) + "..."
                    : chef.description}
                </div>

                <div className="social">
                  {JSON.parse(chef.media).map((link, index) => {
                    if (link.type === "facebook" || link.type === "instagram") {
                      return (
                        <Link to={link.url} className="link" key={index}>
                          <i className={`fab fa-${link.type} ${link.type}`}></i>
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>

                <Link to={`/single-chef/${chef.id}`} className="go_details btnActive">
                  go details
                  <i className="fas fa-arrow-up-right"></i>
                </Link>
              </div>

              <div className="card-img">
                <img src={chef.image} alt={chef.name} loading="lazy" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

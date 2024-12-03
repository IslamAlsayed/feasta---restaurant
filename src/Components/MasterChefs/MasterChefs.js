import "./MasterChefs.css";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { getData } from "../../axiosConfig/API";

export default function MasterChefs() {
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
    <div className="MasterChefs">
      <div className="container">
        <h2 className="title">
          <p>
            our <span>master Chef</span>
          </p>

          <p>{Object(cheffs).length} chefs</p>
        </h2>

        <Swiper
          className="mySwiper cards"
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {cheffs.map((chef, index) => (
            <SwiperSlide className="card" key={index}>
              <div className="card-info">
                <h3>{chef.name}</h3>
                <div className="description">
                  {String(chef.description).length > 300
                    ? String(chef.description).slice(0, 300) + "..."
                    : chef.description}
                </div>

                <div className="social">
                  {chef.media.map((link, index) => (
                    <div className="link" key={index}>
                      <i className={`fab fa-${link}`}></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-img">
                <img
                  src={require(`../../${chef.image}`)}
                  alt={chef.name}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

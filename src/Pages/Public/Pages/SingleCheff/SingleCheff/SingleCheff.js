import "./SingleCheff.css";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../../axiosConfig/API";

export default function SingleCheff() {
  const { id } = useParams();
  const [cheffById, setCheffById] = useState();
  const [loading, setLoading] = useState(false);

  const fetchOurChefs = useCallback(async (id) => {
    try {
      const result = await getData("ourChefs");
      const data = result.find((cheff) => cheff.id === parseInt(id));
      setCheffById(data);
      setLoading(true);
    } catch (error) {
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchOurChefs(id);
  }, [id, fetchOurChefs]);

  useEffect(() => {
    setTimeout(() => {
      // experiences groups
      let groups = document.querySelectorAll(".experiences .group");
      groups.forEach((group) => {
        group.querySelector("summary").addEventListener("click", function () {
          groups.forEach((g) => g.classList.remove("active"));
          group.classList.add("active");
        });
      });

      // skills groups
      let spansProgress = document.querySelectorAll(".skills .skillProgress");
      spansProgress.forEach((span) => {
        span.style.width = `${span.dataset.width}`;
      });
    }, 1000);
  }, []);

  if (!loading) return <p>loading...</p>;

  return (
    <div className="SingleCheff">
      <div className="container">
        {cheffById && (
          <div className="chef">
            <div className="detail">
              <div className="chef-img">
                <img
                  src={require(`../../../../../${cheffById.image}`)}
                  alt={cheffById.name}
                  loading="lazy"
                />
              </div>

              <div className="chef-info">
                <h2>{cheffById.title}</h2>
                <div className="description">{cheffById.description}</div>
                <h2>
                  age: <span>{cheffById.age} years</span>
                </h2>
                <h2>
                  experience:
                  <span> {cheffById.years_experience} years</span>
                </h2>
                <h2>
                  specialty: <span>{cheffById.psecialization}</span>
                </h2>

                <div className="contact">
                  <h2>contact him:</h2>
                  <div>
                    <div className="links">
                      <div>
                        <i className="fas fa-phone"></i>
                        {cheffById.phone}
                      </div>
                      <div>
                        <i className="fas fa-envelope"></i>
                        {cheffById.email}
                      </div>
                    </div>

                    <div className="social">
                      {cheffById.media &&
                        cheffById.media.length > 0 &&
                        cheffById.media.map((link, index) => (
                          <div className="link" key={index}>
                            <i className={`fab fa-${link} ${link}`}></i>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text">
              <h2>about valentino</h2>
              <div className="description">{cheffById.about}</div>
            </div>

            <div className="information">
              <div className="experiences">
                <h2>experience</h2>

                <div className="groups">
                  {cheffById.experience &&
                    cheffById.experience.length > 0 &&
                    cheffById.experience.map((group, index) => (
                      <div
                        className={`group ${index === 0 && "active"}`}
                        key={index}
                      >
                        <div className="title">
                          <summary>{group.title}</summary>
                        </div>
                        <div className="description">{group.description}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="skills">
                <h2>skills</h2>

                <div className="groups">
                  {cheffById.skills &&
                    cheffById.skills.length > 0 &&
                    cheffById.skills.map((group, index) => (
                      <div className="group" key={index}>
                        <span>{group.title}</span>
                        <span
                          className="skillProgress"
                          data-width={group.progressWidth}
                        ></span>
                        <small>{group.progressWidth}</small>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

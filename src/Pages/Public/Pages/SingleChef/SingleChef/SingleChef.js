import "./SingleChef.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../../../../axiosConfig/API";

export default function SingleChef() {
  const { id } = useParams();
  const [chef, setChef] = useState();
  const [loading, setLoading] = useState(false);

  const fetchOurChefs = useCallback(async (id) => {
    try {
      const result = await getData(`chefs/${id}`);
      if (result.status === 200) {
        setChef(result.result);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchOurChefs(id);
  }, [id, fetchOurChefs]);

  const handleOpenGroup = (e) => {
    // experiences groups
    let groups = document.querySelectorAll(".experiences .group");
    groups.forEach((group) => group.classList.remove("active"));

    let group = e.target.parentElement.parentElement;
    group.classList.toggle("active");
  }

  useEffect(() => {
    setTimeout(() => {
      // skills groups
      let spansProgress = document.querySelectorAll(".skills .skillProgress");
      spansProgress.forEach((span) => {
        span.style.width = `${span.dataset.width}%`;
      });
    }, 1000);
  }, []);

  if (!loading) return;

  return (
    <div className="SingleChef">
      <div className="container">
        {chef && (
          <div className="chef">
            <div className="detail">
              <div className="chef-img">
                <img src={chef.image} alt={chef.name} loading="lazy" />
              </div>

              <div className="chef-info">
                <h2>{chef.titleJob}</h2>
                <div className="about">{chef.about}</div>
                <h2>age: <span>{chef.age} years</span></h2>
                <h2>experience: <span>{chef.years_experience} years</span></h2>
                <h2>specialty: <span>{chef.specialty}</span></h2>

                <div className="contact">
                  <div className="links">
                    <h2>contact him:</h2>
                    <div>
                      <i className="fas fa-phone"></i>
                      <Link to={`tel: ${chef.phone}`}>{chef.phone}</Link>
                    </div>
                    <div>
                      <i className="fas fa-envelope"></i>
                      <Link to={`mailto: ${chef.email}`}>{chef.email}</Link>
                    </div>
                  </div>

                  <div className="social">
                    <h2>social media:</h2>

                    <div className="media">
                      {chef.media &&
                        JSON.parse(chef.media).length > 0 &&
                        JSON.parse(chef.media).map((link, index) => {
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
                  </div>
                </div>
              </div>
            </div>

            <div className="text">
              <h2>description valentino</h2>
              <div className="description">{chef.description}</div>
            </div>

            <div className="information">
              <div className="experiences">
                <h2>experience</h2>

                <div className="groups">
                  {chef.experience &&
                    JSON.parse(chef.experience).length > 0 &&
                    JSON.parse(chef.experience).map((group, index) => (
                      <div className={`group ${index === 0 && "active"}`} key={index}>
                        <div className="title"><summary onClick={(e) => handleOpenGroup(e)}>{group.title}</summary></div>
                        <div className="description">{group.description}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="skills">
                <h2>skills</h2>

                <div className="groups">
                  {chef.skills &&
                    JSON.parse(chef.skills).length > 0 &&
                    JSON.parse(chef.skills).map((group, index) => (
                      <div className="group" key={index}>
                        <span>{group.title}</span>
                        <span className="skillProgress" data-width={group.progress}></span>
                        <small>{group.progress}%</small>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

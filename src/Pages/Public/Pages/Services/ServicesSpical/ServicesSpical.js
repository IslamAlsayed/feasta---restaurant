import "./ServicesSpical.css";
import React, { useEffect, useState } from "react";

export default function ServicesSpical() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices([
      {
        icon: "kitchen-set",
        head: "best chef",
        title: "experience",
        description:
          "If several languages coalesce, the grammar the resulting language regular",
      },
      {
        icon: "cookie-bite",
        head: "best dishes",
        title: "food",
        description:
          "If several languages coalesce, the grammar the resulting language regular",
      },
      {
        icon: "headset",
        head: "24/7 supoport",
        title: "supoport",
        description:
          "If several languages coalesce, the grammar the resulting language regular",
      },
      {
        icon: "hand-holding-droplet",
        head: "catering",
        title: "services",
        description:
          "If several languages coalesce, the grammar the resulting language regular",
      },
      {
        icon: "book-atlas",
        head: "online booking",
        title: "reservation",
        description:
          "If several languages coalesce, the grammar the resulting language regular",
      },
      {
        icon: "square-parking",
        head: "valet parking",
        title: "parking",
        description:
          "If several languages coalesce, the grammar the resulting language regular",
      },
    ]);
  }, []);

  return (
    <div className="ServicesSpical">
      <div className="container">
        <div className="services">
          <div className="title">
            <h2>
              our spicial <span>services</span>
            </h2>
            <p>
              To achieve this, it would be necessary to have uniform grammar.
              pronunciation and more common words.
            </p>
          </div>

          <div className="cards">
            {services.map((service, index) => (
              <div className={`card ${index === 1 && "active"}`} key={index}>
                <i className={`fas fa-${service.icon}`}></i>
                <h4>{service.head}</h4>
                <span>{service.title}</span>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import "./WordsSatisfaction.css";
import React, { useEffect, useState } from "react";
import img1 from "../../../../../Assets/images/people/img1.jpg";
import img2 from "../../../../../Assets/images/people/img2.jpg";
import img3 from "../../../../../Assets/images/people/img3.jpg";
import img4 from "../../../../../Assets/images/people/img4.jpg";
import img5 from "../../../../../Assets/images/people/img5.jpg";

export default function WordsSatisfaction() {
  const [clients, setClients] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(2);

  useEffect(() => {
    setClients([
      {
        id: 1,
        image: img1,
        name: "Client 1",
        description: "Description for client 1.",
      },
      {
        id: 2,
        image: img2,
        name: "Client 2",
        description: "Description for client 2.",
      },
      {
        id: 3,
        image: img3,
        name: "Client 3",
        description: "Description for client 3.",
      },
      {
        id: 4,
        image: img4,
        name: "Client 4",
        description: "Description for client 4.",
      },
      {
        id: 5,
        image: img5,
        name: "Client 5",
        description: "Description for client 5.",
      },
    ]);
  }, []);

  const handleClientSlide = (id) => {
    const newIndex = clients.findIndex((client) => client.id === id);
    setActiveCardIndex(newIndex);
  };

  const styles = [
    {
      left: "0%",
      zIndex: 5,
      filter: "blur(3px)",
      transform: "translateX(0) scale(.7) perspective(16px) rotateY(1deg)",
    },
    {
      left: "35%",
      zIndex: 7,
      filter: "blur(1px)",
      transform: "translateX(-50%) scale(.9) perspective(16px) rotateY(0.5deg)",
    },
    {
      left: "50%",
      zIndex: 9,
      filter: "blur(0)",
      cursor: "default",
      transform: "translateX(-50%) scale(1)",
    },
    {
      left: "65%",
      zIndex: 7,
      filter: "blur(1px)",
      transform:
        "translateX(-50%) scale(.9) perspective(16px) rotateY(-0.5deg)",
    },
    {
      left: "100%",
      zIndex: 5,
      filter: "blur(3px)",
      transform: "translateX(-100%) scale(.7) perspective(16px) rotateY(-1deg)",
    },
  ];

  return (
    <div className="WordsSatisfaction">
      <div className="container">
        <div className="satisfaction">
          <div className="title">
            <h2>
              some words of <span>satisfaction</span>
            </h2>
            <p>
              to achieve this, it would be necessary to have uniform grammar.
            </p>
            <p>pronunciation and more common words.</p>
          </div>

          <div className="slider">
            <div id="cards" className="cards">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => handleClientSlide(client.id)}
                  style={
                    styles[
                      (index - activeCardIndex + 2 + clients.length) %
                        clients.length
                    ]
                  }
                >
                  <div className="card-img">
                    <img
                      src={client.image}
                      alt={`client name: ${client.name}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-info">
                    <p>
                      {String(client.description).length > 90
                        ? String(client.description).slice(0, 90)
                        : client.description}
                    </p>
                    <h2>{client.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

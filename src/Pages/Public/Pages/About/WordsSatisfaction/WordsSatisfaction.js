import "./WordsSatisfaction.css";
import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../../../../../axiosConfig/API";

export default function WordsSatisfaction() {
  const [clients, setClients] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(2);
  const [loading, setLoading] = useState(false);

  const fetchSatisfaction = useCallback(async () => {
    setLoading(false);

    try {
      const result = await getData("ratings");

      if (result.status === 200) {
        result.result.sort((a, b) => {
          return parseFloat(b.rate) - parseFloat(a.rate);
        });

        let limit = result.result.slice(0, 5);

        setClients(limit)
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchSatisfaction();
  }, [fetchSatisfaction]);

  // useEffect(() => {
  //   setClients([
  //     {
  //       id: 1,
  //       image: img1,
  //       name: "Client 1",
  //       description: "Description for client 1.",
  //     },
  //     {
  //       id: 2,
  //       image: img2,
  //       name: "Client 2",
  //       description: "Description for client 2.",
  //     },
  //     {
  //       id: 3,
  //       image: img3,
  //       name: "Client 3",
  //       description: "Description for client 3.",
  //     },
  //     {
  //       id: 4,
  //       image: img4,
  //       name: "Client 4",
  //       description: "Description for client 4.",
  //     },
  //     {
  //       id: 5,
  //       image: img5,
  //       name: "Client 5",
  //       description: "Description for client 5.",
  //     },
  //   ]);
  // }, []);

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

  if (!loading) return;

  return (
    <div className="WordsSatisfaction">
      <div className="container">
        <div className="satisfaction">
          <div className="title">
            <h2>some words of <span>satisfaction</span></h2>
            <p>to achieve this, it would be necessary to have uniform grammar.</p>
            <p>pronunciation and more common words.</p>
          </div>

          <div className="slider">
            <div id="cards" className="cards">
              {clients.map((client, index) => (
                <div key={index} className="card"
                  onClick={() => handleClientSlide(client.id)}
                  style={styles[(index - activeCardIndex + 2 + clients.length) % clients.length]}>

                  <div className="card-img">
                    <img src={client.client.image} alt={`client name: ${client.client.name}`} loading="lazy" />
                  </div>

                  <div className="rate">
                    {client.rate}
                    <i className="fas fa-star"></i>
                  </div>

                  <div className="card-info">
                    <p>
                      {String(client.message).length > 90
                        ? String(client.message).slice(0, 90)
                        : client.message}
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

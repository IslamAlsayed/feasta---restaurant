import "./TheCounter.css";
import React, { useState, useEffect, useCallback } from "react";
import { getData } from "../../../../../axiosConfig/API";

export default function TheCounter() {
  const [counter, setCounter] = useState([]);
  const [started, setStarted] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const result = await getData("subscribes/counter");
      if (result.status === 200) {
        setCounter([
          {
            key: 'clients',
            icon: "face-smile-beam",
            target: result.result.clients,
            title: "happy clients",
          },
          {
            key: 'ratings',
            icon: "heart",
            target: result.result.ratings,
            title: "rating people",
          },
          {
            key: 'orders',
            icon: "mug-hot",
            target: result.result.orders,
            title: "orders",
          },
          {
            key: 'recipes',
            icon: "book",
            target: result.result.recipes,
            title: "cooked recipes",
          },
        ])
      }
    } catch (error) {
      console.error(error.response || error.message);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const startCount = (element) => {
    const goal = parseInt(element.dataset.target) || 0;
    let increment = goal >= 1000 ? Math.floor(goal / 1000) : goal;
    let target = 0;

    if (goal > 0) {
      const intervalTime = goal > 0 ? Math.floor(2000 / goal) : 1;

      const counterInterval = setInterval(() => {
        target += increment;
        element.textContent = target;

        if (target >= goal) {
          element.textContent = goal;
          if (goal >= 1000) {
            element.textContent = (goal / 1000).toFixed(1) + "k";
          }
          clearInterval(counterInterval);
        }
      }, intervalTime);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionCounter = document.getElementById("TheCounter");
      if (window.scrollY + 300 >= sectionCounter.offsetTop && !started) {
        const counters = document.querySelectorAll(".counter-target");
        counters.forEach((counter) => startCount(counter));
        setStarted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [started]);

  return (
    <div className="TheCounter" id="TheCounter">
      <div className="container">
        {!Object(counter).length > 0 && (
          <div className="sky-loading">
            {Array.from({ length: 4 }).map((_, index) =>
              <div className="card" key={index}><i></i><span></span><p></p></div>)}
          </div>)}

        <div className="row">
          {counter.map((count, index) => (
            <div className="col" key={index}>
              <i className={`fas fa-${count.icon}`}></i>
              <span className="counter-target" data-target={count.target}>0</span>
              <p>{count.title}</p>
            </div>))}
        </div>
      </div>
    </div>
  );
}

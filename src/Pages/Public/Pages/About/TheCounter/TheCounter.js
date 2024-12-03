import "./TheCounter.css";
import React, { useEffect } from "react";

export default function TheCounter() {
  useEffect(() => {
    const sectionCounter = document.querySelector(".TheCounter");
    const counters = document.querySelectorAll(".count");
    let started = false;

    window.addEventListener("scroll", () => {
      if (window.scrollY + 350 >= sectionCounter.offsetTop && !started) {
        counters.forEach(startCount);
        started = true;
      }
    });

    function startCount(element) {
      const goal = parseInt(element.dataset.count) || 0;
      let increment = goal >= 1000 ? Math.floor(goal / 1000) : goal;

      if (goal > 0) {
        const intervalTime = 1 / goal;
        let count = 0;

        const counterInterval = setInterval(() => {
          element.textContent = count < increment ? ++count : increment;

          if (count === increment) {
            if (goal >= 1000) {
              element.textContent += "k";
            }
            clearInterval(counterInterval);
            element.parentElement.querySelector("i").classList.remove("count");
          }
        }, intervalTime);
      }
    }
  }, []);

  return (
    <div className="TheCounter">
      <div className="container">
        <div className="row">
          <div className="col">
            <i className="far fa-face-smile-beam"></i>
            <p className="count" data-count="5150">
              0
            </p>
            <span>happy clients</span>
          </div>

          <div className="col">
            <i className="fas fa-heart"></i>
            <p className="count" data-count="947">
              0
            </p>
            <span>rating people</span>
          </div>

          <div className="col">
            <i className="fas fa-mug-hot"></i>
            <p className="count" data-count="2">
              0
            </p>
            <span>orders</span>
          </div>

          <div className="col">
            <i className="fas fa-book"></i>
            <p className="count" data-count="349">
              0
            </p>
            <span>cooked recipes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

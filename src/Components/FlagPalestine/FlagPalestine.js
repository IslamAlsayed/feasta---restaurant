import "./FlagPalestine.css";
import React, { useState } from "react";
import flagPalestine from "../../Assets/flag-palestine2-min.gif";

export default function FlagPalestine() {
  const [flagPalestineActive, setFlagPalestineActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleToggleFlagPalestine = () => {
    setFlagPalestineActive((prev) => !prev);
    if (!flagPalestineActive) {
      setCounter(10);

      document.body.style.overflow = flagPalestineActive ? "visible" : "hidden";

      const id = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter > 1) {
            return prevCounter - 1;
          } else {
            clearInterval(id);
            setFlagPalestineActive((prev) => !prev);
            document.body.style.overflow = "visible";
            return 0;
          }
        });
      }, 1000);

      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      document.body.style.overflow = "visible";
      setCounter(0);
    }
  };

  return (
    <div className="FlagPalestine">
      <img
        src={flagPalestine}
        alt="flag palestine"
        onClick={() => handleToggleFlagPalestine()}
      />
      {flagPalestineActive && (
        <div className="note">
          <div className="content">
            فِلَسْطِين حرة وهي بحكم القانون دولة ذات سيادة في غرب آسيا
            <p> لا سمح الله</p>، وتحكمها رسميًا منظمة التحرير الفلسطينية وتطالب
            بالضفة الغربية وقطاع غزة
            <p>اما النصر او الأستشهاد</p>
            <b>{counter}</b>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Banner from "./Banner/Banner";
import TheStarters from "./TheStarters/TheStarters";
import TheDiscount from "./TheDiscount/TheDiscount";
import WeekMenu from "./WeekMenu/WeekMenu";

export default function Index() {
  return (
    <div className="Index" style={{ overflow: "hidden" }}>
      <Banner />
      <TheStarters />
      <TheDiscount />
      <WeekMenu />
    </div>
  );
}

import React from "react";
import Banner from "./Banner/Banner";
import Reservation from "./Reservation/Reservation";
import EatBetter from "./EatBetter/EatBetter";

export default function Index() {
  return (
    <div className="Index" style={{ overflow: "hidden" }}>
      <Banner />
      <Reservation />
      <EatBetter />
    </div>
  );
}

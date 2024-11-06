import React from "react";
import Banner from "./Banner/Banner";
import EatBetter from "./EatBetter/EatBetter";

export default function Index() {
  return (
    <div className="Index" style={{ overflow: "hidden" }}>
      <Banner />
      <EatBetter />
    </div>
  );
}

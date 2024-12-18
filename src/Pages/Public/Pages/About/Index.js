import React from "react";
import Banner from "../../../../Components/Banner/Banner";
import BestCoffee from "./BestCoffee/BestCoffee";
import WordsSatisfaction from "./WordsSatisfaction/WordsSatisfaction";
import TheCounter from "./TheCounter/TheCounter";
import MasterChefs from "../../../../Components/MasterChefs/MasterChefs";

export default function Index() {
  return (
    <div className="Index">
      <Banner title="about us" description="great and experienced team" />
      <TheCounter />
      <BestCoffee />
      <MasterChefs />
      <WordsSatisfaction />
    </div>
  );
}

import React from "react";
import Banner from "./Banner/Banner";
import Resewation from "./Resewation/Resewation";
import PopularDishes from "./PopularDishes/PopularDishes";
import TabsRecipes from "./TabsRecipes/TabsRecipes";
import DoYouLike from "./DoYouLike/DoYouLike";

export default function Index() {
  return (
    <div className="Index" style={{ overflow: "hidden" }}>
      <Banner />
      <Resewation />
      <PopularDishes />
      <TabsRecipes />
      <DoYouLike />
    </div>
  );
}

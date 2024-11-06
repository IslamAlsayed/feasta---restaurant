import React from "react";
import Banner from "./Banner/Banner";
import Resewation from "./Resewation/Resewation";
import Recipes from "./Recipes/Recipes";
import Discount from "./Discount/Discount";
import UniqueRecipe from "./UniqueRecipe/UniqueRecipe";
import LatestNews from "./LatestNews/LatestNews";
import Subscribe from "./Subscribe/Subscribe";

export default function Index() {
  return (
    <div className="Index">
      <Banner />
      <Resewation />
      <Recipes />
      <Discount />
      <UniqueRecipe />
      <LatestNews />
      <Subscribe />
    </div>
  );
}

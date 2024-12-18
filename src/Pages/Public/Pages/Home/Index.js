import React from "react";
import Banner from "./Banner/Banner";
import Reservation from "./Reservation/Reservation";
import Recipes from "./Recipes/Recipes";
import Discount from "./Discount/Discount";
import UniqueRecipe from "./UniqueRecipe/UniqueRecipe";
import LatestNews from "./LatestNews/LatestNews";
import Subscribe from "./Subscribe/Subscribe";

export default function Index() {

  return (
    <div className="Index">
      <Banner />
      <Reservation />
      <Recipes />
      <Discount />
      <UniqueRecipe />
      <LatestNews />
      <Subscribe />
    </div>
  );
}

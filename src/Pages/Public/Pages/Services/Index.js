import React from "react";
import WeDo from "./WeDo/WeDo";
import Banner from "../../../../Components/Banner/Banner";
import ServicesSpical from "./ServicesSpical/ServicesSpical";
import TastyFood from "./TastyFood/TastyFood";
import MasterChefs from "../../../../Components/MasterChefs/MasterChefs";

export default function Index() {
  return (
    <div className="Index" style={{ overflow: "hidden" }}>
      <Banner title="services" description="great and experienced team" />
      <WeDo />
      <ServicesSpical />
      <MasterChefs />
      <TastyFood />
    </div>
  );
}

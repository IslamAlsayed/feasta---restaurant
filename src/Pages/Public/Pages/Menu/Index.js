import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import TheStarters from "./TheStarters/TheStarters";
import TheDiscount from "./TheDiscount/TheDiscount";
import WeekMenu from "./WeekMenu/WeekMenu";
import { useLocation } from "react-router-dom";
import { isAuth } from "../../../../axiosConfig/Auth";

export default function Index() {
  const location = useLocation();
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    setUserAuth(isAuth());
  }, [location]);

  return (
    <div className="Index" style={{ overflow: "hidden" }}>
      <Banner />
      <TheStarters />
      {userAuth && <TheDiscount />}
      <WeekMenu />
    </div>
  );
}

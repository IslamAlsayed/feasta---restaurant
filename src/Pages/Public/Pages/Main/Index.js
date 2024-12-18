import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Reservation from "./Reservation/Reservation";
import PopularDishes from "./PopularDishes/PopularDishes";
import TabsRecipes from "./TabsRecipes/TabsRecipes";
import DoYouLike from "./DoYouLike/DoYouLike";
import { useLocation } from "react-router-dom";
import { isAuth } from "../../../../axiosConfig/Auth";

export default function Index() {
  const location = useLocation();
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuth();
      setUserAuth(authStatus)
    }
    checkAuth();
  }, [location]);

  return (
    <div className="Index" style={{ overflow: "hidden" }}>
      <Banner />
      {userAuth && <Reservation />}
      <PopularDishes />
      <TabsRecipes />
      <DoYouLike />
    </div>
  );
}

import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import SingleChef from "./SingleChef/SingleChef";
import { useLocation, useNavigate } from "react-router-dom";
import { isAuth } from "../../../../axiosConfig/Auth";
import MasterChefs from "../../../../Components/MasterChefs/MasterChefs";

export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuth();
      if (authStatus === false) navigate("/chefs");
    }
    checkAuth();
  }, [location, navigate]);

  return (
    <div className="Index">
      <Banner />
      <SingleChef />
      <MasterChefs />
    </div>
  );
}

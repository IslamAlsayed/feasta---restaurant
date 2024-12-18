// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { getClient } from "../../axiosConfig/Auth";

// function ProtectedRoute({ element: Component, ...rest }) {
//   const isAuth = Cookies.get("token_foodScan");
//   return isAuth ? <Component {...rest} /> : <Navigate to="/auth/login" />;
// }

export default function Dashboard() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const parsedData = getClient();
  //   if (parsedData) {
  //     try {
  //       if (parsedData && parsedData.role !== "admin") {
  //         navigate("/auth/login");
  //       }
  //     } catch (error) {
  //       console.error("Failed to get user data from cookie", error);
  //       navigate("/auth/login");
  //     }
  //   } else {
  //     navigate("/auth/login");
  //   }
  // }, [navigate]);

  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
    </div>
  );
}

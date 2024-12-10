import React, { useCallback, useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Reservation from "./Reservation/Reservation";
import Recipes from "./Recipes/Recipes";
import Discount from "./Discount/Discount";
import UniqueRecipe from "./UniqueRecipe/UniqueRecipe";
import LatestNews from "./LatestNews/LatestNews";
import Subscribe from "./Subscribe/Subscribe";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "../../../../axiosConfig/API";
import { ADD_ITEM_HELPER, USER_HELPER } from "../../../../Store/helper";
import { useDispatch } from "react-redux";

export default function Index() {
  const { id, code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dataFetched, setDataFetched] = useState(false);

  // const fetchCart = useCallback(async (id, code) => {
  //   try {
  //     const result = await getData(`cart/${id}/${code}`);
  //     // const result = await getData(`cart/${8}/${'0C9F277A49'}`);

  //     let items = JSON.parse(result.result.items);
  //     items.map(item => dispatch({ type: "ADD_ITEM", payload: item }))

  //     localStorage.setItem('orderId', id);
  //     localStorage.setItem('code', code);
  //     setDataFetched(true);
  //   } catch (error) {
  //     setDataFetched(false);
  //     console.error("Error fetching cart data:", error);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (id && code) {
  //     fetchCart(id, code);
  //   }
  // }, [id, code, fetchCart]);

  // useEffect(() => {
  //   if (dataFetched) window.location.reload();
  // }, [dataFetched, localStorage.getItem('cartItems')]);

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

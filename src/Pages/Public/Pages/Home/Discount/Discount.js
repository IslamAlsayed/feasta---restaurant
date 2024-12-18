import "./Discount.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../../Store/helper";
import Bibimbap from "../../../../../Assets/images/logos/bibimbap.png";
import { getData } from "../../../../../axiosConfig/API";

export default function Discount() {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipe = useCallback(async () => {
    setLoading(false);
    try {
      const result = await getData("offers/1");
      if (result.status === 200) {
        setRecipe(result.result);
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (!loading) return;

  return (
    <div className="DiscountBanner">
      <div className="box-voucher">
        <div className="content-voucher">
          <div className="logo">
            <img src={Bibimbap} alt="site logo" loading="lazy" />
            <div className="logo-title">
              <span>feasta</span>
              <span>egyptian restaurant</span>
            </div>
          </div>

          <div className="image">
            <img src={recipe.menu?.image} alt={recipe.menu?.title} />
          </div>

          <div className="discount">
            special discount <br />
            <span>{recipe.discount}%</span> off
          </div>

          <div className="voucher">
            <h2>{recipe.menu?.title}</h2>
            <p>{recipe.description}</p>
          </div>

          <div className="action">
            <button className="btn btnActive add" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)} >
              add order
              <i className="fa-solid fa-cart-plus"></i>
            </button>
          </div>

          <div className="social">
            <i className="fa-brands fa-facebook facebook"></i>
            <i className="fa-brands fa-twitter twitter"></i>
            <i className="fa-brands fa-google-plus-g google"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

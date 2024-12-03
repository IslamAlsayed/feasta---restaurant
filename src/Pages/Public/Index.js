import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import CartDrawer from "../../Components/CartDrawer/CartDrawer";
import Home from "./Pages/Home/Index";
import Main from "./Pages/Main/Index";
import Menu from "./Pages/Menu/Index";
import Contact from "./Pages/Contact/Index";
import About from "./Pages/About/Index";
import Cheffs from "./Pages/Cheffs/Index";
import Services from "./Pages/Services/Index";
import BookTable from "./Pages/BookTable/Index";
import SingleCheffs from "./Pages/SingleCheff/Index";
import AllRecipes from "./Pages/AllRecipes/AllRecipes";
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails";
import Footer from "../../Components/Footer/Footer";
import SecondFooter from "../../Components/SecondFooter/SecondFooter";
import FlagPalestine from "../../Components/FlagPalestine/FlagPalestine";
import CheckOut from "./Pages/CheckOut/CheckOut";
import GoTop from "../../Components/GoTop/GoTop";

export default function Index() {
  const [footer, setFooter] = useState(<Footer />);
  const location = useLocation();

  useEffect(() => {
    setFooter(location.pathname === "/" ? <Footer /> : <SecondFooter />);
  }, [location.pathname]);

  return (
    <div className="Index">
      <Header />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cheffs" element={<Cheffs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/single-cheff/:id" element={<SingleCheffs />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
      {footer}

      <FlagPalestine />
      <GoTop />
    </div>
  );
}

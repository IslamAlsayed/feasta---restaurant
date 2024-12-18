import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import CartDrawer from "../../Components/CartDrawer/CartDrawer";
import Home from "./Pages/Home/Index";
import Main from "./Pages/Main/Index";
import Menu from "./Pages/Menu/Index";
import Contact from "./Pages/Contact/Index";
import About from "./Pages/About/Index";
import Chefs from "./Pages/Chefs/Index";
import Services from "./Pages/Services/Index";
import BookTable from "./Pages/BookTable/Index";
import Blogger from "./Pages/Blogger/Blogger";
import Article from "./Pages/Article/Article";
import SingleChefs from "./Pages/SingleChef/Index";
import AllRecipes from "./Pages/AllRecipes/AllRecipes";
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails";
import Footer from "../../Components/Footer/Footer";
import SecondFooter from "../../Components/SecondFooter/SecondFooter";
import FlagPalestine from "../../Components/FlagPalestine/FlagPalestine";
import CheckOut from "./Pages/CheckOut/CheckOut";
import GoTop from "../../Components/GoTop/GoTop";
import Profile from "./Pages/Profile/Profile";
import NotYet from "./NotYet";

export default function Index() {
  const location = useLocation();
  const [footer, setFooter] = useState();

  useEffect(() => {
    setFooter();
    setTimeout(() => {
      setFooter(location.pathname === "/" ? <Footer /> : <SecondFooter />);
    }, 3000);
  }, [location]);

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
        <Route path="/chefs" element={<Chefs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/blogger" element={<Blogger />} />
        <Route path="/blogger/:id" element={<Article />} />
        <Route path="/single-chef/:id" element={<SingleChefs />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/terms-of-use" element={<NotYet text="terms-of-use" />} />
        <Route path="/privacy-policy" element={<NotYet text="privacy-policy" />} />
        <Route path="/contact" element={<NotYet text="contact" />} />
        <Route path="/support" element={<NotYet text="support" />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {footer}

      <FlagPalestine />
      <GoTop />
    </div>
  );
}

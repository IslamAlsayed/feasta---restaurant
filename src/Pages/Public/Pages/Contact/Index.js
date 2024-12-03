import React, { useEffect, useState } from "react";
import Banner from "../../../../Components/Banner/Banner";
import ContactForm from "./ContactForm/ContactForm";
import GoogleMap from "./GoogleMap/GoogleMap";
import { useLocation } from "react-router-dom";
import { isAuth } from "../../../../axiosConfig/Auth";

export default function Index() {
  const location = useLocation();
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    setUserAuth(isAuth());
  }, [location]);

  return (
    <div className="Index">
      <Banner title="contact us" description="Lorem ipsum dolor sit" />
      {userAuth && <ContactForm />}
      <GoogleMap />
    </div>
  );
}

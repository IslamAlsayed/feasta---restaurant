import React from "react";
import Banner from "../../../../Components/Banner/Banner";
import ContactForm from "./ContactForm/ContactForm";
import GoogleMap from "./GoogleMap/GoogleMap";

export default function Index() {
  return (
    <div className="Index">
      <Banner title="contact us" description="Lorem ipsum dolor sit" />
      <ContactForm />
      <GoogleMap />
    </div>
  );
}

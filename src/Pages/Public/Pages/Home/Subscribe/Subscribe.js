import "./Subscribe.css";
import { addData } from "../../../../../axiosConfig/API";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Subscribe() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (email !== "") {
      try {
        const response = await addData("subscribes", { email: email });
        if (response.status === 200) {
          setEmail("");
          Swal.fire("Saved!", response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.result, "error");
      }
    }
  };

  return (
    <div className="AppSubscribe">
      <div className="container">
        <div className="subscribe">
          <div className="info">
            <h2>subscribe to get touch</h2>
            <div className="description">
              connecting ideas and people, how take can change our lives
            </div>
          </div>

          <div className="form">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
              <button className="btn btnActive" onClick={() => handleSubmit()}>subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

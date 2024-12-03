import "./css/styles.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
// import Admin from "./admin";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

export default function Index() {
  return (
    <div className="Index">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

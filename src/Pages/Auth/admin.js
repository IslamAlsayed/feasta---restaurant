import "./css/admin.css";

// import "../../Assets/Dash/css/app.css";

// import { useState } from "react";
// import { login } from "../../axiosConfig/Auth";
// import { Link, useNavigate } from "react-router-dom";
// import bibimbap from "../../Assets/images/logos/bibimbap.png";

export default function Admin() {
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("islam@gmail.com");
  // const [password, setPassword] = useState("test1234");
  // const [error, setError] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   if (!email || !password) {
  //     setError("Both email and password are required");
  //     setTimeout(() => setError(""), 3000);
  //     return;
  //   }

  //   // try {
  //   //   const response = await login(email, password);

  //   //   if (response.status === 200) {
  //   //     setEmail("");
  //   //     setPassword("");
  //   //     setError(response.message);
  //   //     setTimeout(() => navigate("/index"), 500);
  //   //   }
  //   // } catch (error) {
  //   //   setError(error.message);
  //   //   setTimeout(() => setError(""), 3000);
  //   // }
  // };

  return (
    <div className="adminLogin">
      <div className="form">
        <form>
          <h4>Welcome to my kingdom</h4>

          <div className="group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue="admin@example.com"
            />
          </div>

          <div className="group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue="1234567"
            />
          </div>

          <div className="group">
            <button type="submit">submit</button>

            <div className="otherForm">
              <a href="/auth/resetPassword" className="resetPassword">
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

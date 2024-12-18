import { useState } from "react";
import { login } from "../../axiosConfig/Auth";
import { Link } from "react-router-dom";
import bibimbap from "../../Assets/images/logos/bibimbap.png";

export default function Login() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("test123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitForm = document.getElementById("submitForm");
    submitForm.classList.add('load');

    if (!email || !password) {
      setError("Both email and password are required");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const response = await login(email, password);

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        window.location.href = '/';
        submitForm.classList.remove('load');
      } else {
        setError(response.message);
        setTimeout(() => setError(""), 5000);
        submitForm.classList.remove('load');
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 5000);
      submitForm.classList.remove('load');
    }
  };

  return (
    <div className="formUser">
      <div className="inner">
        <Link to="/" className="logo">
          <div className="logo-img">
            <img src={bibimbap} alt="site logo" loading="lazy" />
          </div>
          <div className="logo-title">
            <span>feasta</span>
            <span>egyptian restaurant</span>
          </div>
        </Link>

        <div className="content">
          <form autoComplete="off" onSubmit={handleSubmit}>
            {error && <div className="alert">{error}</div>}
            <div className="group-input">
              <label htmlFor="email">email</label>
              <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div className="group-input">
              <label htmlFor="password">password</label>
              <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="group-input">
              <button type="submit" id="submitForm">Login</button>
            </div>
          </form>

          <div className="otherForm">
            <a href="/auth/resetPassword" className="resetPassword">
              Forgot your password?
            </a>
          </div>

          <div className="otherForm">
            <span>I don't have account?</span>
            <a href="/auth/register">register</a>
          </div>
        </div>

        <footer className="footer">
          <p> © 2024 For support <a href="https://www.linkedin.com/in/islam-alsayed7">IslamAlsayed</a> , Inc.</p>
          <p>
            Please check out our <Link to="#">Help Site</Link>,
            <Link to="/terms-of-use"> Terms of Use</Link>, and
            <Link to="/privacy-policy"> Privacy Policy</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}

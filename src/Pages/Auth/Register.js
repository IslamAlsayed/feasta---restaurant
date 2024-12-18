import { useState } from "react";
import { register } from "../../axiosConfig/Auth";
import { Link } from "react-router-dom";
import bibimbap from "../../Assets/images/logos/bibimbap.png";

export default function Register() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "islam",
    phone: "01065438133",
    email: "islam@gmail.com",
    password: "test123",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitForm = document.getElementById("submitForm");
    submitForm.classList.add('load');

    if (!user.name || !user.email || !user.password) {
      setError("This Fields are required");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const response = await register(user);

      if (response.status === 201) {
        setUser({ name: "", phone: "", email: "", password: "" });
        submitForm.classList.remove('load');

        setTimeout(() => window.location.href = '/', 500);
      } else {
        setError(response?.message);
        setTimeout(() => setError(""), 5000);

        if (response?.error?.email[0]) {
          setError(response.error.email[0]);
        }

        submitForm.classList.remove('load');
      }
    } catch (error) {
      setError(error?.message);
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
              <label htmlFor="name">name</label>
              <input type="text" name="name" id="name" value={user.name} onChange={(e) => handleChange(e)} required />
            </div>

            <div className="group-input">
              <label htmlFor="phone">phone</label>
              <input type="text" name="phone" id="phone" value={user.phone} onChange={(e) => handleChange(e)} required />
            </div>

            <div className="group-input">
              <label htmlFor="email">email</label>
              <input type="email" name="email" id="email" value={user.email} onChange={(e) => handleChange(e)} required />
            </div>

            <div className="group-input">
              <label htmlFor="password">password</label>
              <input type="password" name="password" id="password" value={user.password} onChange={(e) => handleChange(e)} required />
            </div>

            <div className="group-input">
              <button type="submit" id="submitForm">register</button>
            </div>
          </form>

          <div className="otherForm">
            <span>Already have an account?</span>
            <a href="/auth/login">Sign in</a>
          </div>
        </div>

        <footer className="footer">
          <p>
            © 2024 For support
            <a href="https://www.linkedin.com/in/islam-alsayed7">
              IslamAlsayed
            </a>
            , Inc.
          </p>
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

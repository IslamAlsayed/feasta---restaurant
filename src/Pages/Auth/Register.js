import { useState } from "react";
import { register } from "../../axiosConfig/Auth";
import { Link, useNavigate } from "react-router-dom";
import bibimbap from "../../Assets/images/logos/bibimbap.png";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("islam");
  const [phone, setPhone] = useState("01065438133");
  const [email, setEmail] = useState("islam@gmail.com");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("This Fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await register({
        name,
        phone,
        email,
        password,
      });

      if (response.status === 201) {
        setError(response.message);

        setTimeout(() => {
          setName("");
          setPhone("");
          setEmail("");
          setPassword("");
          navigate("/");
        }, 1500);
      } else {
        if (response.error.email[0]) {
          setError(response.error.email[0]);
        }
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
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
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="group-input">
              <label htmlFor="phone">phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>

            <div className="group-input">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="group-input">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="group-input">
              <button type="submit">register</button>
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

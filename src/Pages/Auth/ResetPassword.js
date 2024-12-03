import { Link } from "react-router-dom";
import bibimbap from "../../Assets/images/logos/bibimbap.png";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <h2>forget password?</h2>
            <p>
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>
            <div className="group-input">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                value="islam@gmail.com"
              />
            </div>
            <div className="group-input">
              <button type="submit">send email verify</button>
            </div>
          </form>

          <div className="otherForm">
            <a href="/auth/resetPassword" className="resetPassword">
              Forgot your password?
            </a>
          </div>

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

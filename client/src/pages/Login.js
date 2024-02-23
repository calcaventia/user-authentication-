import { React, useState } from "react";
import { onLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import logo from "../images/Logo.png";
import imageUrl from "../images/speaker.png";
import "../Styles.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = (e) => {
    setValues({ ...values, rememberMe: e.target.checked });
    console.log("Remember Me checkbox status:", e.target.checked);
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };
  return (
    <div className="mt-5 register-container">
      <div className="row">
        <div className="col-sm-6 rounded-start-5" id="form-column">
          <img src={logo} alt="logo" className="logo mt-4" />
          <form onSubmit={(e) => onSubmit(e)} className="form-box mt-5">
            <h1 className="text-center fs-2 sign-up">Log In</h1>
            <p className="text-center create-account">Log in to get started.</p>
            <div className="mb-3">
              <input
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control placeholder-box"
                id="name"
                name="name"
                value={values.name}
                placeholder="Name"
                required
              />
            </div>

            <div className="mb-3">
              <input
                onChange={(e) => onChange(e)}
                type="email"
                className="form-control placeholder-box"
                id="email"
                name="email"
                value={values.email}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="mb-3">
              <input
                onChange={(e) => onChange(e)}
                type="password"
                className="form-control placeholder-box"
                id="password"
                name="password"
                value={values.password}
                placeholder="password"
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={(e) => onCheckboxChange(e)}
              />
              <label
                className="form-check-label rememberMe"
                htmlFor="rememberMe"
              >
                Remember Me
              </label>
            </div>

            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              id="login-button"
            >
              Login
            </button>
            <p className="mt-1 text-center create-account mt-3">
              Don't have an account?
              <NavLink to="/register" className="mx-3 register-link">
                <span>Register</span>
              </NavLink>
            </p>
          </form>
        </div>
        <div className="col-sm-6">
          <img
            src={imageUrl}
            alt="sound speaker"
            className="rounded-end-5 speaker-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

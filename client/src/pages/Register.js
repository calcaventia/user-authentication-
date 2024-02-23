import { React, useState } from "react";
import { onRegistration } from "../api/auth.js";
import logo from "../images/Logo.png";
import imageUrl from "../images/speaker.png";
import "../Styles.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };
  return (
    <div className="mt-5 register-container">
      <div className="row">
        <div className="col-sm-6 rounded-start-5" id="form-column">
          <img src={logo} alt="logo" className="logo mt-4" />
          <form onSubmit={(e) => onSubmit(e)} className="form-box mt-5">
            <h1 className="text-center fs-2 sign-up">Sign Up</h1>
            <p className="text-center create-account">
              Create an account to get started.
            </p>
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
            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
            <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
            <button
              type="submit"
              className="btn btn-dark w-100"
              id="register-button"
            >
              Register
            </button>
            <p className="mt-1 text-center create-account mt-3">
              Already have an account?
              <NavLink to="/login" className="mx-3 login-link">
                Log in
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

export default Register;

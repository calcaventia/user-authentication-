import { React, useEffect, useState } from "react";
import "../Styles.css";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <div className="welcome-body">
          <h1 className="greeting">Welcome to RUIX</h1>
          <h2 className="fs-5 mb-4">{protectedData}</h2>
          <div className="d-flex gap-4">
            <button className="btn btn-light continue-button">Continue</button>
            <button
              onClick={() => logout()}
              className="btn btn-light logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;

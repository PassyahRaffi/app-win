import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ModalLogin from "./components/modals/ModalLogin";
import ModalRegister from "./components/modals/ModalRegister";

import { LoginContext } from "./context/context";
import { setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { API } from "./config/api";

import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  let navigate = useNavigate();
  const [login, setLogin] = useContext(LoginContext);
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      setLogin(false);
      navigate("/");
    } else {
      setLogin(true);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      {login ? <Navbar /> : <Jumbotron />}
      <ModalRegister />
      <ModalLogin />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default App;

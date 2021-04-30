import React, { useEffect } from "react";
import "./App.css";
import { setScreen } from "./features/screenSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Game from "./pages/Game/Game";
import AboutUS from "./pages/AboutUS/AboutUS";
import LoginPage from "./pages/LoginAndSignup/LoginPage/LoginPage";
import ForgotPassword from "./pages/LoginAndSignup/ForgotPassword/ForgotPassword";
import axios from "axios";

const App = () => {
  const screenDispatch = useDispatch(setScreen);

  axios.defaults.baseURL = "http://localhost:5000/api";

  window.addEventListener("resize", () => {
    if (window.outerWidth < 1000) {
      screenDispatch(setScreen("Mobile"));
    } else if (window.outerWidth < 1367 && window.outerWidth > 1000) {
      screenDispatch(setScreen("HD"));
    } else if (window.outerWidth > 1367) {
      screenDispatch(setScreen("Full HD"));
    }
  });

  useEffect(() => {
    if (window.outerWidth < 1000) {
      screenDispatch(setScreen("Mobile"));
    } else if (window.outerWidth < 1367 && window.outerWidth > 1000) {
      screenDispatch(setScreen("HD"));
    } else if (window.outerWidth > 1367) {
      screenDispatch(setScreen("Full HD"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/game" exact component={Game} />
          <Route path="/about" exact component={AboutUS} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/forgot_password" exact component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

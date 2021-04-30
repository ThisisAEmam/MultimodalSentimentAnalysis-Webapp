import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Navbar.module.css";
import { setLoggedin } from "../../../features/LoggedinSlice";
import { setCurrentUser } from "../../../features/currentUserSlice";
import { useDispatch } from "react-redux";
import { JWTCookie, UserCookie } from "../../../app/cookie";

const Navbar = (props) => {
  const [isMyAccountOpen, setMyAccountOpen] = useState(null);
  const loginDispatch = useDispatch(setLoggedin);
  const currentUserDispatch = useDispatch(setLoggedin);
  const history = useHistory();

  const myAccountClickHandler = () => {
    if (isMyAccountOpen === null || !isMyAccountOpen) {
      setMyAccountOpen(true);
    } else {
      setMyAccountOpen(false);
    }
  };
  const logoutHandler = () => {
    currentUserDispatch(setCurrentUser({ username: "", firstname: "", lastname: "", email: "" }));
    loginDispatch(setLoggedin({ status: false, token: "" }));
    const jwt = new JWTCookie();
    const user = new UserCookie();
    jwt.remove();
    user.remove();
    history.push("/");
  };

  return (
    <div className={classes.Navbar}>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <Link to="/">
            <img src="/logo-placeholder.png" alt="logo" className={classes.logo} />
          </Link>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.notifications}></div>
          <Link to="/" className={classes.homeBtn}>
            Home
          </Link>
          <div className={classes.myAccount}>
            <button className={classes.myAccountBtn} onClick={myAccountClickHandler}>
              My Account <i className={`fa fa-chevron-${isMyAccountOpen ? "up" : "down"}`}></i>
            </button>
            <ul className={[classes.myAccountList, isMyAccountOpen ? classes.shown : isMyAccountOpen === false ? classes.hidden : null].join(" ")}>
              <li>
                <Link to="/profile">
                  <i className="fa fa-user"></i>My Profile
                </Link>
              </li>
              <li>
                <Link to="/account_settings">
                  <i className="fa fa-cog"></i>Account Settings
                </Link>
              </li>
              <li onClick={logoutHandler}>
                <i className="fa fa-sign-out-alt"></i>Log Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

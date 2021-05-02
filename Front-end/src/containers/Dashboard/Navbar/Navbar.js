import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const [isMyAccountOpen, setMyAccountOpen] = useState(null);

  const myAccountClickHandler = () => {
    if (isMyAccountOpen === null || !isMyAccountOpen) {
      setMyAccountOpen(true);
    } else {
      setMyAccountOpen(false);
    }
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
              <li>
                <Link to="/logout">
                  <i className="fa fa-sign-out-alt"></i>Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

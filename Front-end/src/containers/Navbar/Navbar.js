import React from "react";
import { useState } from "react";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const [isMyAccountOpen, setMyAccountOpen] = useState(false);

  const myAccountClickHandler = () => {
    setMyAccountOpen(!isMyAccountOpen);
  };

  return (
    <div className={classes.Navbar}>
      <div className={classes.container}>
        <img src="logo-placeholder.png" alt="logo" className={classes.logo} />
        <div className={classes.rightSide}>
          <div className={classes.myAccount}>
            <button className={classes.myAccountBtn} onClick={myAccountClickHandler}>
              My Account <i className={`fa fa-chevron-${isMyAccountOpen ? "up" : "down"}`}></i>
            </button>
            <ul className={[classes.myAccountList, isMyAccountOpen ? classes.shown : classes.hidden].join(" ")}>
              <li>
                <i className="fa fa-user"></i>My Profile
              </li>
              <li>
                <i className="fa fa-cog"></i>Account Settings
              </li>
              <li>
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

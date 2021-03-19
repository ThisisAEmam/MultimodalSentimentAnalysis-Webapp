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
            <button onClick={myAccountClickHandler}>
              My Account <i className={`fa fa-chevron-${isMyAccountOpen ? "up" : "down"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

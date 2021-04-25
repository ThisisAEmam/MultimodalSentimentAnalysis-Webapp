import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./NavbarItems.module.css";
import { Link } from "react-router-dom";
import MobileNavItem from "../MobileNavItem/MobileNavItem";
import navItems from "./data";

const NavbarItems = (props) => {
  const location = useLocation();

  const content = props.mobile ? (
    <div className={[classes.navBtns, classes.mobile].join(" ")}>
      {navItems.map((item, index) => (
        <MobileNavItem key={index} text={item.text} url={item.url} icon={item.icon} active={location.pathname === item.url} />
      ))}
    </div>
  ) : (
    <div className={classes.navBtns}>
      {navItems.map((item, index) => (
        <Link key={index} to={item.url} className={location.pathname === item.url ? classes.active : null}>
          {item.text}
        </Link>
      ))}
    </div>
  );

  return content;
};

export default NavbarItems;

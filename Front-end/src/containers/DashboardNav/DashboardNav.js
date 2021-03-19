import React from "react";
import { useState } from "react";
import DBNavItem from "../../components/DBNavItem/DBNavItem";
import classes from "./DashboardNav.module.css";
import data from "./data";

const DashboardNav = (props) => {
  const [selected, setSelected] = useState(null);
  const selectHandler = (i) => {
    setSelected(i);
  };
  return (
    <div className={classes.DashboardNav}>
      {data.map((item, index) => (
        <DBNavItem selected={selected === index} selHandler={selectHandler} index={index} key={index} text={item.text} icon={item.icon} />
      ))}
    </div>
  );
};

export default DashboardNav;

import React from "react";
import classes from "./DBNavItem.module.css";

const DBNavItem = (props) => {
  const clickHandler = () => {
    props.selHandler(props.index);
  };
  return (
    <div className={[classes.DBNavItem, props.selected ? classes.selected : null].join(" ")} onClick={clickHandler}>
      <i className={`fa fa-${props.icon}`}></i>
      <p>{props.text}</p>
    </div>
  );
};

export default DBNavItem;

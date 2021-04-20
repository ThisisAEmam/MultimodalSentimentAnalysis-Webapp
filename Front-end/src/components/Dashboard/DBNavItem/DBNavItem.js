import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./DBNavItem.module.css";

const DBNavItem = (props) => {
  const [isNotification, setNotification] = useState(true);
  const clickHandler = () => {
    props.selHandler(props.label);
  };

  useEffect(() => {
    if (props.selected === props.label) {
      setNotification(false);
    }
  }, [props.label, props.selected]);

  return (
    <Link to={props.label} className={classes.link}>
      <div className={[classes.DBNavItem, props.selected === props.label ? classes.selected : null].join(" ")} onClick={clickHandler}>
        <i className={props.icon}></i>
        <p>{props.text}</p>
        {props.models && isNotification ? <h6 className={classes.notifications}>2</h6> : null}
      </div>
    </Link>
  );
};

export default DBNavItem;

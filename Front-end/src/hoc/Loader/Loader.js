import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => {
  return (
    <div className={[classes.LoaderContainer, props.fullPage ? classes.fullPage : null].join(" ")}>
      <div className={classes.ldsGrid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

import React from "react";
import Navbar from "../../containers/Homepage/Navbar/Navbar";
import classes from "./AboutUS.module.css";

const AboutUS = (props) => {
  return (
    <div className={classes.AboutUS}>
      <Navbar />
      <p>Hello From About Us</p>
    </div>
  );
};

export default AboutUS;

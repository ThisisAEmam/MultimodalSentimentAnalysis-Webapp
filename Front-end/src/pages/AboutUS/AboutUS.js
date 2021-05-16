import React from "react";
import TeamMembers from "../../containers/Aboutpage/TeamMembers/TeamMembers";
import Navbar from "../../containers/Homepage/Navbar/Navbar";
import classes from "./AboutUS.module.css";

const AboutUS = (props) => {
  return (
    <div className={classes.AboutUS}>
      <Navbar />
      <div className={classes.body}>
        <TeamMembers />
      </div>
    </div>
  );
};

export default AboutUS;

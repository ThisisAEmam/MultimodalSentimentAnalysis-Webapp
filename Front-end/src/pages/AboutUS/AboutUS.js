import React from "react";
import AboutUsSection from "../../containers/Aboutpage/AboutUsSection/AboutUsSection";
import TeamMembers from "../../containers/Aboutpage/TeamMembers/TeamMembers";
import Navbar from "../../containers/Homepage/Navbar/Navbar";
import Footer from "../../containers/Homepage/Footer/Footer";
import classes from "./AboutUS.module.css";

const AboutUS = (props) => {
  return (
    <div className={classes.AboutUS}>
      <Navbar />
      <div className={classes.body}>
        <AboutUsSection />
        <TeamMembers />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUS;

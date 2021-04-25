import React from "react";
import Banner from "../../containers/Homepage/Banner/Banner";
import GameSection from "../../containers/Homepage/GameSection/GameSection";
import MSASection from "../../containers/Homepage/MSASection/MSASection";
import Navbar from "../../containers/Homepage/Navbar/Navbar";
import classes from "./Homepage.module.css";

const Homepage = (props) => {
  return (
    <div className={classes.Homepage}>
      <Navbar />
      <Banner />
      <MSASection />
      <GameSection />
    </div>
  );
};

export default Homepage;

import React, { useEffect } from "react";
import classes from "./DatasetCreator.module.css";
import Navbar from "../../containers/Homepage/Navbar/Navbar";
import Footer from "../../containers/Homepage/Footer/Footer";
import BackToTop from "../../components/Homepage/BackToTop/BackToTop";

const DatasetCreator = (props) => {
  useEffect(() => {
    console.log(window.navigator.platform);
  }, []);
  return (
    <div className={classes.DatasetCreator}>
      <Navbar />
      <h1>Hello World</h1>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default DatasetCreator;

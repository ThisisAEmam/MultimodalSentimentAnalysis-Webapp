import React from "react";
import classes from "./MSASection.module.css";
import SectionHeader from "../../../components/Homepage/SectionHeader/SectionHeader";

const MSASection = (props) => {
  return (
    <div className={classes.MSASection}>
      <div className={classes.container}>
        <img className={classes.sectionImage} src="/images/phone_sentiment.png" alt="phone_sentiment" />
        <div className={classes.textContainer}>
          <SectionHeader>What is Multimodal Sentiment Analysis?</SectionHeader>
          <div className={classes.textBody}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui error laudantium sequi quae maxime? Nobis?</p>
          </div>
        </div>
      </div>
      <img className={classes.singleCircles1} src="/images/single_circles.png" alt="circles" />
    </div>
  );
};

export default MSASection;

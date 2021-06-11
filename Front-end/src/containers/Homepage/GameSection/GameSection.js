import React from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../../../components/Homepage/SectionHeader/SectionHeader";
import classes from "./GameSection.module.css";

const GameSection = (props) => {
  return (
    <div className={classes.GameSection}>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <SectionHeader>Sentimeter: The Game</SectionHeader>
          <div className={classes.textBody}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui error laudantium sequi quae maxime? Nobis?</p>
          </div>
          <div className={classes.btnContainer}>
            <Link to="/game">
              <button className={classes.button}>Start Game</button>
            </Link>
          </div>
        </div>
        <img className={classes.sectionImage} src="/images/video_influencer.png" alt="video_influencer" />
      </div>
      <img className={classes.singleCircles1} src="/images/single_circles.png" alt="circles" />
      <img className={classes.doubleCircles1} src="/images/double_circles.png" alt="circles" />
    </div>
  );
};

export default GameSection;

import React from "react";
import classes from "./Banner.module.css";

const Banner = (props) => {
  return (
    <div className={classes.Banner}>
      <div className={classes.container}>
        <div className={classes.text}>
          <h1>Multimodal Sentiment Analysis</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis.</p>
        </div>
        <img src="/video_sentiment.png" alt="bannerImage" className={classes.bannerImage} />
      </div>
    </div>
  );
};

export default Banner;

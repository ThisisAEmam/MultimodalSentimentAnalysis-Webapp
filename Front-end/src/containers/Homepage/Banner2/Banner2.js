import React, { useEffect, useRef, useState } from "react";
import classes from "./Banner2.module.css";
import { useSpring, animated, config, useChain } from "react-spring";

const Banner2 = (props) => {
  const [bgLoad, setBGLoad] = useState(false);

  useEffect(() => {
    setBGLoad(true);
  }, []);

  const bgRef = useRef();
  const textRef = useRef();
  const imageRef = useRef();

  const bgSpring = useSpring({
    ref: bgRef,
    from: {
      transform: "translateY(-100%)",
    },
    to: {
      transform: bgLoad ? "translateY(0)" : "translateY(-100%)",
    },
    config: config.slow,
  });

  const imageSpring = useSpring({
    ref: imageRef,
    from: {
      opacity: 0,
      transform: "translate(10%, 10%)",
    },
    to: {
      opacity: bgLoad ? 1 : 0,
      transform: bgLoad ? "translate(0, 0)" : "translate(10%, 10%)",
    },
    config: { mass: 5, friction: 30, tension: 100 },
  });

  const textSpring = useSpring({
    ref: textRef,
    from: {
      opacity: 0,
    },
    to: {
      opacity: bgLoad ? 1 : 0,
    },
    config: config.default,
  });

  useChain(bgLoad ? [bgRef, imageRef, textRef] : [textRef, imageRef, bgRef], [0, 0.5, 1]);

  return (
    <div className={classes.Banner}>
      <animated.div style={bgSpring} className={classes.background}></animated.div>
      <div className={classes.container}>
        <animated.div style={textSpring} className={classes.text}>
          <h1>Multimodal Sentiment Analysis</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis.</p>
          <button className={classes.startBtn}>Start now</button>
        </animated.div>
        <animated.img style={imageSpring} src="/images/banner_image.svg" alt="bannerImage" className={classes.bannerImage} />
      </div>
    </div>
  );
};

export default Banner2;

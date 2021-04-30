import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import classes from "./Notification.module.css";

const Notification = (props) => {
  const [shown, setShown] = useState(true);

  const spring = useSpring({
    from: {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate(-50%, -2rem)",
    },
    opacity: shown ? 1 : 0,
    pointerEvents: shown ? "all" : "none",
    transform: shown ? "translate(-50%, 0)" : "translate(-50%, -2rem)",
    config: config.default,
  });

  useEffect(() => {
    setTimeout(() => {
      setShown(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!shown) {
      setTimeout(() => {
        props.shown(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const clickHandler = () => {
    setShown(false);
  };

  return (
    <animated.div style={spring} className={[classes.Notification, props.alert ? classes.alert : null, props.success ? classes.success : null].join(" ")}>
      <p>{props.children}</p>
      <i className="fa fa-times" onClick={clickHandler}></i>
    </animated.div>
  );
};

export default Notification;

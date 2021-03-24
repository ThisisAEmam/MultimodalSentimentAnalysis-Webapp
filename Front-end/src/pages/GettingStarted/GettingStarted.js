import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PageTitle from "../../components/PageTitle/PageTitle";
import classes from "./GettingStarted.module.css";
import "./transitions.css";

const GettingStarted = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextClickHandler = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const prevClickHandler = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className={classes.GettingStarted}>
      <PageTitle>Getting Started</PageTitle>
      <div className={classes.container}>
        <div className={classes.body}>
          <TransitionGroup>
            <CSSTransition key={currentIndex} timeout={1000} classNames={"slide"}>
              <div className={classes.slideItem}>{currentIndex}</div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <button onClick={prevClickHandler}>prev</button>
        <button onClick={nextClickHandler}>next</button>
      </div>
    </div>
  );
};

export default GettingStarted;

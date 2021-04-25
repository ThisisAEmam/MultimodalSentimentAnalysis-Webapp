import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";
import classes from "./GettingStarted.module.css";
import "./transitions.css";

const GettingStarted = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [nextToDone, setNextToDone] = useState(false);

  useEffect(() => {
    if (currentIndex > 0) {
      setShowBack(true);
    } else {
      setShowBack(false);
    }
    if (currentIndex >= 4) {
      setNextToDone(true);
    } else {
      setNextToDone(false);
    }
  }, [currentIndex]);

  const nextClickHandler = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const backClickHandler = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const doneClickHandler = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className={classes.GettingStarted}>
      <PageTitle>Getting Started</PageTitle>
      <div className={classes.container}>
        <div className={classes.body}>
          <TransitionGroup>
            <CSSTransition key={currentIndex} timeout={1000} classNames={"slide"}>
              <div className={classes.slideItem}></div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className={classes.btnsContainer}>
          <button className={[classes.backBtn, showBack ? classes.showBtn : null].join(" ")} onClick={backClickHandler}>
            Back
          </button>
          {!nextToDone ? (
            <button className={classes.nextBtn} onClick={nextClickHandler}>
              Next
            </button>
          ) : (
            <button className={classes.nextBtn} onClick={doneClickHandler}>
              <Link to="/dashboard/overview">Done</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;

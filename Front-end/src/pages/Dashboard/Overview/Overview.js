import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";
import classes from "./Overview.module.css";
import { useSelector } from "react-redux";
import OverviewCounter from "../../../components/Dashboard/OverviewCounter/OverviewCounter";

const Overview = (props) => {
  const [name, setName] = useState("");
  const { currentUser } = useSelector((state) => state);

  useEffect(() => {
    setName(currentUser.firstName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.Overview}>
      <PageTitle>Overview</PageTitle>
      <div className={classes.body}>
        <div className={[classes.welcomeBack, classes.bg].join(" ")}>
          <h2>Welcome back, {name}!</h2>
          <p>Create a new Multimodal Sentiment Analysis (MSA) model to use it in your application right now.</p>
        </div>
        <div className={[classes.myModels, classes.bg].join(" ")}>
          <h4 className={classes.sectionTitle}>My Models</h4>
          <OverviewCounter end={3} icon="plus-circle">
            Models created
          </OverviewCounter>
          <OverviewCounter end={2} icon="spinner">
            Models in progress
          </OverviewCounter>
        </div>
        <div className={[classes.models, classes.bg].join(" ")}>
          <h4 className={classes.sectionTitle}>Other Models</h4>
          <OverviewCounter end={6} icon="heart">
            Models Liked
          </OverviewCounter>
          <OverviewCounter end={18} icon="bookmark">
            Models Bookmarked
          </OverviewCounter>
        </div>
      </div>
    </div>
  );
};

export default Overview;

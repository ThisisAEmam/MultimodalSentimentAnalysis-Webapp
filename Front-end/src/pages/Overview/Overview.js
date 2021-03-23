import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import classes from "./Overview.module.css";
import { useSelector } from "react-redux";

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
          <p>Create a new Multimodal Sentiment Analysis (MSA) model instance and use it in your application right now.</p>
        </div>
        <div className={[classes.myModels, classes.bg].join(" ")}>
          <h4 className={classes.sectionTitle}>My Models</h4>
        </div>
        <div className={[classes.models, classes.bg].join(" ")}>
          <h4 className={classes.sectionTitle}>Other Models</h4>
        </div>
      </div>
    </div>
  );
};

export default Overview;

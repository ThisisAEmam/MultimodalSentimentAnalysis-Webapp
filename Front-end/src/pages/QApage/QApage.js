import React from "react";
import QACard from "../../components/QACard/QACard";
import classes from "./QApage.module.css";

const QApage = (props) => {
  return (
    <div className={classes.QApage}>
      <h1 className={classes.title}>Questions and Answers</h1>
      <QACard question="How are you?">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dignissimos laboriosam eligendi libero, nobis magnam id exercitationem illum totam
        culpa?
      </QACard>
      <QACard question="Who are we?">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dignissimos laboriosam eligendi libero, nobis magnam id exercitationem illum totam
        culpa?
      </QACard>
    </div>
  );
};

export default QApage;

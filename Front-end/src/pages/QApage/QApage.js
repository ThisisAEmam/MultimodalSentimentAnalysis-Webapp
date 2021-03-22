import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import QACard from "../../components/QACard/QACard";
import classes from "./QApage.module.css";

const QApage = (props) => {
  return (
    <div className={classes.QApage}>
      <PageTitle>Questions and Answers</PageTitle>
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

import React from "react";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";
import QACard from "../../../components/Dashboard/QACard/QACard";
import classes from "./FAQpage.module.css";

const FAQpage = (props) => {
  return (
    <div className={classes.FAQpage}>
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

export default FAQpage;

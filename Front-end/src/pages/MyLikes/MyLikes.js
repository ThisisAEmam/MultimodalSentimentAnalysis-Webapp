import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import classes from "./MyLikes.module.css";

const MyLikes = (props) => {
  return (
    <div className={classes.MyLikes}>
      <PageTitle>My Likes</PageTitle>
    </div>
  );
};

export default MyLikes;

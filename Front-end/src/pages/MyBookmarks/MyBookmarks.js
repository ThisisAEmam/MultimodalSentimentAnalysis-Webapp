import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import classes from "./MyBookmarks.module.css";

const MyBookmarks = (props) => {
  return (
    <div className={classes.MyBookmarks}>
      <PageTitle>My Bookmarks</PageTitle>
    </div>
  );
};

export default MyBookmarks;

import React, { useEffect, useState } from "react";
import NoMatches from "../../components/NoMatches/NoMatches";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useSelector } from "react-redux";
import ModelsArray from "../../containers/ModelsArray/ModelsArray";
import classes from "./MyBookmarks.module.css";

const MyBookmarks = (props) => {
  const [models, setModels] = useState([]);

  const { bookmarkedModels } = useSelector((state) => state);

  useEffect(() => {
    setModels([...bookmarkedModels]);
  }, [bookmarkedModels]);

  return (
    <div className={classes.MyBookmarks}>
      <PageTitle>My Bookmarks</PageTitle>
      {models.length === 0 ? <NoMatches>You haven't bookmarked any model yet.</NoMatches> : <ModelsArray models={models} />}
    </div>
  );
};

export default MyBookmarks;

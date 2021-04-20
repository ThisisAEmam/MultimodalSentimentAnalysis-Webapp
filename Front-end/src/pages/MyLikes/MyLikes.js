import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoMatches from "../../components/Dashboard/NoMatches/NoMatches";
import PageTitle from "../../components/Dashboard/PageTitle/PageTitle";
import ModelsArray from "../../containers/Dashboard/ModelsArray/ModelsArray";
import classes from "./MyLikes.module.css";

const MyLikes = (props) => {
  const [models, setModels] = useState([]);

  const { likedModels } = useSelector((state) => state);

  useEffect(() => {
    setModels([...likedModels]);
  }, [likedModels]);

  return (
    <div className={classes.MyLikes}>
      <PageTitle>My Likes</PageTitle>
      {models.length === 0 ? <NoMatches>You haven't liked any model yet.</NoMatches> : <ModelsArray models={models} />}
    </div>
  );
};

export default MyLikes;

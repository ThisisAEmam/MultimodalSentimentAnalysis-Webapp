import React, { useState } from "react";
import PageTitle from "../../components/Dashboard/PageTitle/PageTitle";
import data from "./data";
import ModelsArray from "../../containers/Dashboard/ModelsArray/ModelsArray";
import NoMatches from "../../components/Dashboard/NoMatches/NoMatches";
import classes from "./MyModels.module.css";

const MyModels = (props) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={classes.MyModels}>
      <PageTitle>My Models</PageTitle>
      {data.length === 0 ? <NoMatches>You haven't created any models yet. Create your first now!</NoMatches> : <ModelsArray models={data} />}
      <div className={[classes.createNewModelBtn].join(" ")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <p className={classes.plus}>+</p>
        {hovered ? <p className={classes.cnmText}>Create new model</p> : null}
      </div>
    </div>
  );
};

export default MyModels;

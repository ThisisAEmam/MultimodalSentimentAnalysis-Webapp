import React from "react";
import ModelCard from "../../../components/Dashboard/ModelCard/ModelCard";
import classes from "./ModelsArray.module.css";

const ModelsArray = (props) => {
  return (
    <div className={classes.ModelsArray}>
      {props.models.map((item, index) => (
        <ModelCard key={index} id={item.id} index={(index % 8) + 1} name={item.name} user={item.user} likes={item.likes} model={item} />
      ))}
    </div>
  );
};

export default ModelsArray;

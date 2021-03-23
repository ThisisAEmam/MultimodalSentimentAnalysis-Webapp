import React, { useState } from "react";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
import ModelCard from "../../components/ModelCard/ModelCard";
import PageTitle from "../../components/PageTitle/PageTitle";
import data from "./data";
// import "./trans.css";
import classes from "./MyModels.module.css";

const MyModels = (props) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={classes.MyModels}>
      <PageTitle>My Models</PageTitle>
      <div className={classes.body}>
        {data.map((item, index) => (
          <ModelCard key={index} id={item.id} index={(index + 1) % 9} name={item.name} user={item.user} likes={item.likes} />
        ))}
        <div className={[classes.createNewModelBtn].join(" ")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <p className={classes.plus}>+</p>
          {hovered ? <p className={classes.cnmText}>Create new model</p> : null}
        </div>
      </div>
    </div>
  );
};

export default MyModels;

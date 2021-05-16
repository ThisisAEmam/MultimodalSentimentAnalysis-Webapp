import React, { useEffect, useState } from "react";
import ModelCard from "../../../components/Dashboard/ModelCard/ModelCard";
import classes from "./ModelsArray.module.css";
import Loader from "../../../hoc/Loader/Loader";

const ModelsArray = (props) => {
  const [noData, setNoData] = useState(true);
  const [models, setModels] = useState([]);
  useEffect(() => {
    console.log(props.models);
    if (props.models) {
      if (props.models.length > 0) {
        setModels(props.models);
        setNoData(false);
      } else {
        setNoData(true);
      }
    }
  }, [props.models]);
  return (
    <div className={classes.ModelsArray}>
      {!noData ? (
        models.map((item, index) => (
          <ModelCard
            key={index}
            id={item.id}
            index={(index % 8) + 1}
            hasImage={item.image !== null}
            name={item.name}
            user={item.user.username}
            likes={item.likes}
            model={item}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ModelsArray;

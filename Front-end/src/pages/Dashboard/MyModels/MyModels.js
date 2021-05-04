import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";
// import data from "./data";
import ModelsArray from "../../../containers/Dashboard/ModelsArray/ModelsArray";
import NoMatches from "../../../components/Dashboard/NoMatches/NoMatches";
import classes from "./MyModels.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../hoc/Loader/Loader";

const MyModels = (props) => {
  const [hovered, setHovered] = useState(null);
  const { loggedin } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);

  const config = {
    headers: {
      authorization: loggedin.token,
    },
  };

  useEffect(() => {
    axios
      .get("/models/me", config)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      setNoData(true);
      setTimeout(() => {
        setNoData(false);
      }, 1000);
    } else {
      clearTimeout();
      setNoData(false);
    }
  }, [data]);

  return (
    <div className={classes.MyModels}>
      <PageTitle>My Models</PageTitle>
      {noData ? (
        <Loader />
      ) : data.length === 0 ? (
        <NoMatches>You haven't created any models yet. Create your first now!</NoMatches>
      ) : (
        <ModelsArray models={data} />
      )}
      <div className={[classes.createNewModelBtn].join(" ")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <p className={classes.plus}>+</p>
        {hovered ? <p className={classes.cnmText}>Create new model</p> : null}
      </div>
    </div>
  );
};

export default MyModels;

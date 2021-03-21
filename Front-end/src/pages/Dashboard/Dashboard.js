import React from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DashboardNav from "../../containers/DashboardNav/DashboardNav";
import Navbar from "../../containers/Navbar/Navbar";
import Layout from "../../hoc/Layout/Layout";
import MyModels from "../MyModels/MyModels";
import QApage from "../QApage/QApage";
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      history.push(location.pathname + "/overview");
    } else if (location.pathname === "/dashboard/") {
      history.push(location.pathname + "overview");
    }
  });
  let content = null;
  let path = location.pathname.split("/")[2];

  switch (path) {
    case "my_models":
      content = <MyModels />;
      break;
    case "q_a":
      content = <QApage />;
      break;
    default:
      content = <div className={classes.default}></div>;
      break;
  }
  return (
    <div className={classes.Dashboard}>
      <Navbar />
      <div className={classes.container}>
        <DashboardNav match={props.match} />
        <Layout>{content}</Layout>
      </div>
    </div>
  );
};

export default Dashboard;

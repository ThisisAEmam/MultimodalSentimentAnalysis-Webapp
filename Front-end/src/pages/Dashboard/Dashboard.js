import React from "react";
import DashboardNav from "../../containers/DashboardNav/DashboardNav";
import Navbar from "../../containers/Navbar/Navbar";
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      <Navbar />
      <DashboardNav />
    </div>
  );
};

export default Dashboard;

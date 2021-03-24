import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DBNavItem from "../../components/DBNavItem/DBNavItem";
import classes from "./DashboardNav.module.css";

const DashboardNav = (props) => {
  const [selected, setSelected] = useState(null);

  let location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path !== selected) {
      setSelected(path.split("/")[2]);
    }
  }, [location.pathname, selected]);

  const selectHandler = (label) => {
    setSelected(label);
  };

  return (
    <div className={classes.DashboardNav}>
      <div>
        <div className={classes.section}>
          <h3>Overview</h3>
          <DBNavItem selected={selected} selHandler={selectHandler} label="overview" text="Overview" icon="fa fa-list-ul" />
          <DBNavItem selected={selected} selHandler={selectHandler} label="getting_started" text="Getting Started" icon="fa fa-rocket" />
        </div>
        <div className={classes.section}>
          <h3>Models</h3>
          <DBNavItem selected={selected} selHandler={selectHandler} label="my_models" text="My Models" icon="fa fa-layer-group" models />
          <DBNavItem selected={selected} selHandler={selectHandler} label="models" text="Browse Models" icon="fa fa-search" />
          <DBNavItem selected={selected} selHandler={selectHandler} label="my_likes" text="My Likes" icon="fa fa-heart" />
          <DBNavItem selected={selected} selHandler={selectHandler} label="my_bookmarks" text="My Bookmarks" icon="fa fa-bookmark" />
        </div>
        <div className={classes.section}>
          <h3>Support</h3>
          <DBNavItem selected={selected} selHandler={selectHandler} label="faq" text="FAQ" icon="fa fa-question-circle" />
          <DBNavItem selected={selected} selHandler={selectHandler} label="newsletter" text="Newsletter" icon="fa fa-newspaper" />
          <DBNavItem selected={selected} selHandler={selectHandler} label="help" text="Help" icon="fa fa-info-circle" />
        </div>
      </div>
      <div className={classes.copyrights}>
        <p>Graduation Project &copy; 2021</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};

export default DashboardNav;

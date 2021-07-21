import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../../containers/Dashboard/Navbar/Navbar";
import classes from "./AccountSettings.module.css";

const AccountSettings = (props) => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const { loggedin, currentUser } = useSelector((state) => state);

  useEffect(() => {
    if (!loggedin.status) {
      history.replace("/login");
    } else {
      setUser(currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.AccountSettings}>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.formGroup}>
          <h1 className={classes.formGroupName}>Firstname:</h1>
          <input type="text" value={user.firstname} />
          <button className={classes.editBtn}>Edit</button>
        </div>
        <div className={classes.formGroup}>
          <h1 className={classes.formGroupName}>Lastname:</h1>
          <input type="text" value={user.lastname} />
          <button className={classes.editBtn}>Edit</button>
        </div>
        <div className={classes.formGroup}>
          <h1 className={classes.formGroupName}>Username:</h1>
          <input type="text" value={user.username} />
          <button className={classes.editBtn}>Edit</button>
        </div>
        <div className={classes.formGroup}>
          <h1 className={classes.formGroupName}>Email:</h1>
          <input type="text" value={user.email} />
          <button className={classes.editBtn}>Edit</button>
        </div>
        <div className={classes.formGroup}>
          <h1 className={classes.formGroupName}>Password:</h1>
          <div className={classes.passwordInputs}>
            <input name="Password" type="password" />
            <input name="NewPassword" type="password" />
            <input name="ConfirmNewPassword" type="password" />
          </div>
          <button className={classes.editBtn}>Edit</button>
        </div>
        <div className={classes.formGroup}>
          <h1 className={classes.formGroupName}>Image:</h1>
          <img src={user.image ? user.image : "/images/userImageNotFound.jpg"} alt="user_image" />
          <button className={classes.editBtn}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SecondaryPageHeader from "../../components/Homepage/SecondaryPageHeader/SecondaryPageHeader";
import SecondaryPageContainer from "../../containers/Homepage/SecondaryPageContainer/SecondaryPageContainer";
import WhiteContainer from "../../containers/Homepage/WhiteContainer/WhiteContainer";
import classes from "./LoginPage.module.css";
import Notification from "../../components/Homepage/Notification/Notification";

const LoginPage = (props) => {
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const clickHandler = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim() === "") {
      setEmptyEmail(true);
    }

    if (password.trim() === "") {
      setEmptyPassword(true);
    }

    setWrongCredentials(true);
    // console.log();
    // console.log(passwordRef.current.value);
  };

  const notificationShowHandler = (e) => {
    setWrongCredentials(e);
  };

  return (
    <SecondaryPageContainer login>
      <WhiteContainer>
        <SecondaryPageHeader>Login</SecondaryPageHeader>
        <div className={classes.form}>
          <div className={classes.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              ref={emailRef}
              className={emptyEmail ? classes.empty : null}
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={() => setEmptyEmail(false)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              ref={passwordRef}
              className={emptyPassword ? classes.empty : null}
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={() => setEmptyPassword(false)}
            />
          </div>
        </div>
        <div className={classes.btnContainer}>
          <Link to="/forgot_password" className={classes.forgotPassword}>
            Forgot your password?
          </Link>
          <button className={classes.submitBtn} onClick={clickHandler}>
            Login
          </button>
        </div>
        {wrongCredentials ? (
          <Notification shown={notificationShowHandler} alert>
            Hello
          </Notification>
        ) : null}
      </WhiteContainer>
    </SecondaryPageContainer>
  );
};

export default LoginPage;

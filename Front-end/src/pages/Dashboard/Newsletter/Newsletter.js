import React, { useRef, useState } from "react";
import Notification from "../../../components/Dashboard/Notification/Notification";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";
import classes from "./Newsletter.module.css";

const Newsletter = (props) => {
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const [notification, setNotification] = useState(false);

  const clickHandler = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    setEmptyName(false);
    setEmptyEmail(false);
    setNotification(false);

    if (name.trim().length === 0 || email.trim().length === 0) {
      if (name.trim().length === 0) {
        setEmptyName(true);
      }
      if (email.trim().length === 0) {
        setEmptyEmail(true);
      }
      return;
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
    setNotification(true);
  };

  return (
    <div className={classes.Newsletter}>
      <PageTitle>Subscribe to Our Newsletter</PageTitle>
      <div className={classes.body}>
        <div className={classes.leftSide}>
          <p className={classes.text}>Subscribe to our newsletter to get the latest updates on our offers, features and new models we provide.</p>
          <div className={classes.form}>
            <label htmlFor="name">
              Name <span>*</span>
            </label>
            <input name="name" ref={nameRef} className={emptyName ? classes.emptyInput : null} type="text" placeholder="Your name" />
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input name="email" ref={emailRef} className={emptyEmail ? classes.emptyInput : null} type="email" placeholder="Your Email" />
            <button onClick={clickHandler}>Submit</button>
          </div>
        </div>
        <img src="/newsletter.svg" alt="newsletter" />
      </div>
      {notification ? <Notification>Congratulations! You are now subscribed in our newsletter.</Notification> : null}
    </div>
  );
};

export default Newsletter;

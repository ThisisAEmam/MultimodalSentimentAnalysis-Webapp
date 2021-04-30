import React, { useState } from "react";
import classes from "./ForgotPassword.module.css";
import SecondaryPageHeader from "../../../components/Homepage/SecondaryPageHeader/SecondaryPageHeader";
import SecondaryPageContainer from "../../../containers/Homepage/SecondaryPageContainer/SecondaryPageContainer";
import WhiteContainer from "../../../containers/Homepage/WhiteContainer/WhiteContainer";
import FormGroup from "../../../components/Homepage/FormGroup/FormGroup";
import CustomButton from "../../../components/Homepage/CustomButton/CustomButton";

const ForgotPassword = (props) => {
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");

  const getEmailValue = (value) => {
    setEmail(value);
    console.log(email);
  };

  const clickHandler = () => {
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 1000);
  };

  return (
    <SecondaryPageContainer>
      <WhiteContainer>
        <SecondaryPageHeader>Forgot password</SecondaryPageHeader>
        <div className={classes.form}>
          <FormGroup type="email" name="email" getValue={getEmailValue} submit={submit}>
            Email
          </FormGroup>
          <p className={classes.note}>An email will be sent to your inbox if this email is attached to an account in our database.</p>
        </div>
        <div className={classes.btnContainer}>
          <CustomButton onClick={clickHandler}>Submit</CustomButton>
        </div>
      </WhiteContainer>
    </SecondaryPageContainer>
  );
};

export default ForgotPassword;

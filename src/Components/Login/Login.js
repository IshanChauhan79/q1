import React, { useState } from "react";
import classes from "./Login.module.css";
import { useHistory } from "react-router";

function Login(props) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPassValid, setIsPassValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const history = useHistory();

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };
  const passwordChanged = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    var re =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var isValidEmail = re.test(email);
    setIsEmailValid(isValidEmail);
    var isValidPassword = password.length > 7;
    setIsPassValid(isValidPassword);
    setIsFormValid(true);
    if (isValidEmail && isValidPassword) {
      var formValid = props.checkValidity(email, password);
      setIsFormValid(formValid);
    }
  };

  return (
    <div className={classes.Login}>
      <div className={classes.Welcome}>
        <div className={classes.Title}>Welcome Back!</div>
        <div className={classes.Please}>Please login to your account.</div>
      </div>

      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          className={classes.Input}
          onChange={emailChanged}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={classes.Input}
          onChange={passwordChanged}
          value={password}
          required
        />
        <div className={classes.ForgotSection}>
          <div className={classes.Remember}>
            <input id="checkboxlisttest" type="checkbox" />
            <label htmlFor="checkboxlisttest">Remember me</label>
          </div>

          <div className={classes.Forgot}>Forgot Password</div>
        </div>
        {isEmailValid && isPassValid ? null : <div>Invalid Email/Password</div>}
        {isFormValid ? null : <div>Incorrect Email/Password</div>}
        <button type="submit">Login</button>
      </form>
      <div className={classes.Switch} onClick={() => history.push("/sign-up")}>
        Create an account
      </div>
      <div className={classes.Terms}>Terms of use. Privacy Policy</div>
    </div>
  );
}

export default Login;

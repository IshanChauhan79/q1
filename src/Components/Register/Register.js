import React, { useState } from "react";
import classes from "./Register.module.css";
import { useHistory } from "react-router";

function Register(props) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPassValid, setIsPassValid] = useState(true);
  const [name, setName] = useState();
  const [isNameValid, setIsNameValid] = useState(true);
  const [number, setNumber] = useState("");
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const history = useHistory();

  const emailChanged = (e) => {
    setEmail(e.target.value);
    let re =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailValid = re.test(e.target.value.trim());
    setIsEmailValid(emailValid);
  };
  const passwordChanged = (e) => {
    var passw = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const passValid = passw.test(e.target.value);
    setPassword(e.target.value);
    setIsPassValid(passValid);
  };
  const numberChanged = (e) => {
    setNumber(e.target.value);
    let num = e.target.value.toString();
    setIsNumberValid(num.length === 10);
  };
  const nameChanged = (e) => {
    let name_check = /^[a-zA-Z\s]*$/;
    let nameValid = name_check.test(e.target.value.trim());
    setName(e.target.value);
    setIsNameValid(nameValid);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email.trim(),
      name: name.trim(),
      number: number,
      password: password,
    };
    if (isEmailValid && isPassValid && isNameValid && isNumberValid) {
      const valid = props.registerSubmit(data);
      setIsFormValid(valid);
    }
  };
  return (
    <div className={classes.Register}>
      <div className={classes.Welcome}>
        <div className={classes.Title}>Create an Account</div>
      </div>

      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className={classes.Input}
          onChange={nameChanged}
          value={name}
          required
        />
        {isNameValid ? null : (
          <div className={classes.Error}>Alphabets and white space only </div>
        )}

        <input
          type="number"
          placeholder="Phone Number"
          className={classes.Input}
          onChange={numberChanged}
          value={number}
          required
        />
        {isNumberValid ? null : (
          <div className={classes.Error}>10 digit number only</div>
        )}

        <input
          type="email"
          placeholder="Email"
          className={classes.Input}
          onChange={emailChanged}
          value={email}
          required
        />
        {isEmailValid ? null : (
          <div className={classes.Error}>Email not valid</div>
        )}

        <input
          type="password"
          placeholder="Password"
          className={classes.Input}
          onChange={passwordChanged}
          value={password}
          required
        />
        {isPassValid ? null : (
          <div className={classes.Error}>
            min length 8. A-Z, a-z, special characters only.
          </div>
        )}
        {isFormValid ? null : <div>Incorrect Email/Password</div>}
        <button type="submit">Sign up</button>
      </form>
      <div className={classes.Switch} onClick={() => history.push("/")}>
        Switch to Login
      </div>

      <div className={classes.Terms}>Terms of use. Privacy Policy</div>
    </div>
  );
}

export default Register;

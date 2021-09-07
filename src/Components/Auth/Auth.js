import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Users from "../Users/Users";
import classes from "./Auth.module.css";

const dummydata = [
  {
    name: "Ishan",
    email: "ishanhcl@gmail.com",
    password: "12345678",
    number: "9999999999",
  },
  {
    name: "Aniket",
    email: "aniketgalaxy@gmail.com",
    password: "12345678",
    number: "9999999999",
  },
];

function Auth() {
  const [isAuth, setIsAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users"));
    if (data === null || data.length === 0) {
      setUsers(dummydata);
    } else {
      setUsers(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const checkLoginValidity = (email, password) => {
    for (let user of users) {
      if (user.email === email) {
        if (user.password === password) {
          setIsAuth(true);
          history.push("/users");
          return true;
        }
      }
    }
    setIsAuth(false);
    return false;
  };

  const logoutHandler = () => {
    setIsAuth(false);
    history.push("/");
  };

  const createAccount = (data) => {
    for (let user of users) {
      if (user.email === data.email) {
        return false;
      }
    }
    setUsers((prev) => [...prev, data]);
    history.push("/");
    return true;
  };

  return (
    <div className={classes.Auth}>
      <Switch>
        <Route path="/" exact>
          <Login checkValidity={checkLoginValidity} />
        </Route>

        <Route path="/sign-up" exact>
          <Register registerSubmit={createAccount} />
        </Route>
        {isAuth ? (
          <Route path="/users" exact>
            <Users users={users} logout={logoutHandler} />
          </Route>
        ) : null}

        <Route path="/">
          <div>404 Page not Found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default Auth;

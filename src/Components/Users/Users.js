import React from "react";
import classes from "./Users.module.css";


function Users(props) {

  const userslist = props.users.map((user) => (
    <div className={classes.UserData} key={user.email}>
      <div>
        Name: <span className={classes.Data}>{user.name}</span>
      </div>
      <div className={classes.Email}>
        Email: <span className={classes.Data}>{user.email}</span>
      </div>
    </div>
  ));
  return (
    <div className={classes.Users}>
      <div
        className={classes.Logout}
        onClick={() => props.logout}
      >
        Log out
      </div>
      {userslist}
    </div>
  );
}

export default Users;

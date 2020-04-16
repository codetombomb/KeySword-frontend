import React, { Component } from "react";
import accountInfo from "./sprites/backgrounds/accountcreate.png";
import loginInfo from "./sprites/backgrounds/login.png";

let centerStyle = {
  display: "flex",
  justifyContent: "center",
};
class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", checked: false };
    this.handleChecked = this.handleChecked.bind(this);
  }

  //toggle function for if user is logged in or not
  handleChecked() {
    this.setState({ checked: !this.state.checked });
    this.props.refreshUsers();
  }

  //function to create user model via input form
  createUser = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    console.log(username, password);
    const fetchObject = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    this.props.postUser(fetchObject);

    e.target.username.value = "";
    e.target.password.value = "";
    window.alert("You can log in now!");
  };

  //logging user in via passing username and password into prop function passed from App
  logInUser = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    this.props.logIn(username, password);
  };

  render() {
    let inputBar;
    //conditional statement to verify if you have an account or not by checkbox, and adjust display accordingly
    //if checked, log in option component
    if (this.state.checked) {
      inputBar = (
        <div>
          <br></br>
          <div style={centerStyle}>
            <img src={loginInfo}></img>
          </div>
          <br></br>
          <div style={centerStyle}>
            <form onSubmit={this.logInUser}>
              <label>Username: </label>
              <input type="text" name="username" />
              <br></br>
              <br></br>
              <label>Password: </label>
              <input type="password" name="password" />
              <br></br>
              <button>submit</button>
            </form>
          </div>
        </div>
      );
    } else {
      //else create Account component
      inputBar = (
        <div>
          <div style={centerStyle}>
            <img src={accountInfo}></img>
          </div>
          <br></br>
          <div style={centerStyle}>
            <form onSubmit={this.createUser}>
              <label>Username: </label>
              <input type="text" name="username" />
              <br></br>
              <br></br>
              <label>Password: </label>
              <input type="password" name="password" />
              <br></br>
              <button>submit</button>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        {inputBar}
        <br></br>
        <div style={centerStyle}>
          <label className="switch">
            <input type="checkbox" onChange={this.handleChecked} />
            <div className="slider"></div>
          </label>
        </div>
        <div style={centerStyle}>
          <h5>Already played?</h5>
        </div>
      </div>
    );
  }
}
export default UserBar;

import React, { Component } from "react";
import accountInfo from './sprites/backgrounds/accountcreate.png'
import loginInfo from './sprites/backgrounds/login.png'


class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", checked: false };
    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChecked() {
    this.setState({ checked: !this.state.checked });
    this.props.refreshUsers();
  }

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

  logInUser = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    this.props.logIn(username, password);
  };

  render() {
    let inputBar;
    //conditional statement to verify if you have an account or not by checkbox, and adjust display accordingly
    //if checked, log in option
    if (this.state.checked) {
      //   this.props.parseUsernames();
      inputBar = (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img alt="" src={loginInfo}></img>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
      //else create Account
      inputBar = (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img alt="" src={accountInfo}></img>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label className="switch">
            <input type="checkbox" onChange={this.handleChecked} />
            {/* <label>I have an account!</label> */}
            <div className="slider"></div>
          </label>
        </div>
        <div
        style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <h5>Already played?</h5>
          </div>
      </div>
    );
  }
}
export default UserBar;

/* <label className="switch">
  <input
    type="checkbox"
    value={this.state.isChecked}
    onChange={this.handleChange}
  />
  <div className="slider"></div>
</label>; */

import React, { Component } from "react";

class UserBar extends Component {

    logIn = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
    }
  render() {
    return (
      <div >
        <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
          <h1>Log in or create account</h1>
        </div>

        <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
        <form>
          <label>Username</label>
          <input type="text" name="username" onChange={this.logIn}/>

          <label>Password</label>
          <input type="password" name="password" onChange={this.logIn}/>
        </form>
        </div>

      </div>
    );
  }
}
export default UserBar;

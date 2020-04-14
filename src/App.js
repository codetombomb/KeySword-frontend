import React, { Component } from "react";
import GameHeader from "./GameHeader";
import GameShow from "./GameShow";
import GameFooter from "./GameFooter";
import UserBar from "./UserBar";

let baseURL = "http://localhost:3000/";
class App extends Component {
  constructor() {
    super();
    this.state = {
      level: [],
      monsters: [],
      users: [],
      activeUser: [],
      words: [],
      bossWords: [],
      activeWords: ["walter", "fish"],
    };
  }
  //initial setup for game data
  componentDidMount() {
    this.fetchLevel();
    this.fetchUsers();
    this.fetchMonsters();
  }
  //****FETCH FUNCTIONS THAT FOR SOME REASON I COULDN'T REFACTOR?? REACT IS DUMB****//
  fetchLevel = () => {
    return fetch(baseURL + "levels")
      .then((resp) => resp.json())
      .then((level) => this.setState({ level }));
  };
  fetchUsers = () => {
    return fetch(baseURL + "users")
      .then((resp) => resp.json())
      .then((users) => this.setState({ users }));
  };
  fetchMonsters = () => {
    return fetch(baseURL + "monsters")
      .then((resp) => resp.json())
      .then((monsters) => this.setState({ monsters }));
  };

  //***Helper functions *//

  //create user model in DB,
  //!!!!!!!!need to add uniqueness validation eventually!!!!!!!//
  createUser = (userObject) => {
    fetch(baseURL + "users", userObject);
  };

  //given User object, check if input of username and password exists in database, if so set activeUser to username
  UserLogin = (username, password) => {
    console.log(username, password);
    let activeUser = this.state.users.filter(
      (user) => user.username === username
    );
    console.log(activeUser);
    this.setState({ activeUser });
    if (password === activeUser.password) {
      this.setState({ activeUser: activeUser });
    }
  };

  checkIfLoggedIn = () => {
    if (this.state.activeUser.length > 0) {
      return <GameShow words={this.state.level} />;
    } else {
      // this.parseUsernames()
      return (
        <UserBar
          logIn={this.UserLogin}
          postUser={this.createUser}
          refreshUsers={this.fetchUsers}
        />
      );
    }
  };

  render() {
    return (
      <div className="App">
        <GameHeader />
        {/* <GameShow words={this.state.level}/> */}
        {this.checkIfLoggedIn()}
        {this.state.activeUser.length > 0 ? (
          <GameFooter words={this.state.activeWords} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h2>Please sign up or log in!</h2>
          </div>
        )}
      </div>
    );
  }
}
export default App;

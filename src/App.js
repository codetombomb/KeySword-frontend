import React, { Component } from "react";
import GameHeader from "./GameHeader";
import GameShow from "./GameShow";
import GameFooter from "./GameFooter";
import UserBar from "./UserBar";
import background from "./sprites/backgrounds/stonebackground.jpg";
import backgroundholes from "./sprites/backgrounds/stonebackgroundholes.png";

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
  
  //take level words string and add to state words array, shuffling into unique array each time
  createWordsArray = (wordsString) => {
    let words = wordsString.split(", ")
    this.shuffleArray(words)
    console.log(words)
    return words
  }
  
  //Shuffle array to randomize gameplay
  shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  //create user model in DB,
  //!!!!!!!!need to add uniqueness validation eventually!!!!!!!//
  createUser = (userObject) => {
    fetch(baseURL + "users", userObject);
  };

  //given User object, check if input of username and password exists in database, if so set activeUser to username. Also, use this moment to setState of active words, which can be moved but is here to avoid asynch nonsense
  UserLogin = (username, password) => {
    console.log(username, password);
    this.setState({words: this.createWordsArray(this.state.level[0].words)})
    this.setState({bossWords: this.createWordsArray(this.state.level[0].bossWords)})
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
      <div
        className="App"
        
      >
        <GameHeader />
        {this.checkIfLoggedIn()}
        {this.state.activeUser.length > 0 ? (
          <div
            style={{
              backgroundImage: `url(${background})`,
            }}
          >
            <GameFooter words={this.state.activeWords} />
          </div>
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

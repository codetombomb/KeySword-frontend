import React, { Component } from "react";
import GameHeader from "./GameHeader";
import GameShow from "./GameShow";
import GameFooter from "./GameFooter";
import UserBar from "./UserBar";
import background from "./sprites/backgrounds/stonebackground.jpg";
import footerlogo from "./sprites/backgrounds/footerlogo.png";

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
      activeWords: [],
      wordCounter: 0,
      currentScore: 0,
      gameTimer: 120,
      gameRunning: false,
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
    let words = wordsString.split(", ");
    this.shuffleArray(words);
    console.log(words);
    return words;
  };

  //resets the states necessary to "restart" the game from scratch without a refresh
  logOut = () => {
    this.setState({
      activeUser: [],
      activeWords: [],
      wordCounter: 0,
      currentScore: 0,
      gameTimer: 120,
      gameRunning: false,
    });
  };

  //function to remove a word from state.activeWords if the passed in word matches any instance inside the array
  checkValue = (word) => {
    const index = this.state.activeWords.indexOf(word);
    if (index > -1) {
      this.setState(this.state.activeWords.splice(index, 1));
    }
  };

  //add single word from word array to active words on rotating basis without altering original word array
  addWordToActiveWord = () => {
    let wordArray = this.state.words;
    let wordCounter = this.state.wordCounter;
    if (wordArray.length === wordCounter) {
      wordCounter = 0;
    }
    let newWord = wordArray[wordCounter];
    this.setState({ activeWords: [...this.state.activeWords, newWord] });
    wordCounter += 1;

    this.setState({ wordCounter });
  };

  //basic anonymous function to add a block of 5 words to active words array
  setActiveWordsGameStart = () => {
    let wordArray = this.state.words;
    let wordCounter = this.state.wordCounter;
    let newWords = wordArray.slice(0, 5);
    this.setState({
      activeWords: [...this.state.activeWords, ...newWords],
    });
    wordCounter += 5;
    this.setState({ wordCounter });
  };

  //simple add one point to score anonymous function
  addScore = () => {
    let currentScore = this.state.currentScore;
    currentScore += 1;
    this.setState({ currentScore });
  };

  //currently keeps word list to 5
  keepActiveWordsAtFive = () => {
    if (this.state.activeWords.length < 5) {
      this.addWordToActiveWord();
    }
  };

  //Shuffle array to randomize gameplay
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  //create user model in DB,
  //!!!!!!!!need to add uniqueness validation eventually!!!!!!!//
  createUser = (userObject) => {
    console.log(userObject);
    fetch(baseURL + "users", userObject);
  };

  //given User object, check if input of username and password exists in database, if so set activeUser to username. Also, use this moment to setState of active words, which can be moved but is here to avoid asynch nonsense
  UserLogin = (username, password) => {
    console.log(username, password);
    this.setState({ words: this.createWordsArray(this.state.level[0].words) });
    this.setState({
      bossWords: this.createWordsArray(this.state.level[0].bossWords),
    });
    let activeUser = this.state.users.filter(
      (user) => user.username === username
    );
    console.log(activeUser);
    this.setState({ activeUser });
    //temporarily setting state if username matches, need way to also check password
    // if (password === activeUser.password) {
    //   this.setState({ activeUser: activeUser });
    // }
  };

  //determines if component will render gameShow or userBar depnding on if state is logged in or not
  checkIfLoggedIn = () => {
    if (this.state.activeUser.length > 0) {
      return (
        <GameShow
          words={this.state.level}
          gameState={this.state.gameRunning}
          time={this.state.gameTimer}
        />
      );
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

  toggleGameRunning = () => {
    this.setState({gameRunning: true})
  }

  render() {
    return (
      <div className="App">
        <GameHeader />
        {this.checkIfLoggedIn()}
        {this.state.activeUser.length > 0 ? (
          <div
            style={{
              backgroundImage: `url(${background})`,
            }}
          >
            <GameFooter
              startGame={this.toggleGameRunning}
              logOut={this.logOut}
              gameStartWords={this.setActiveWordsGameStart}
              addScore={this.addScore}
              currentScore={this.state.currentScore}
              autoFeed={this.keepActiveWordsAtFive}
              words={this.state.activeWords}
              checkValue={this.checkValue}
              addWord={this.addWordToActiveWord}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img alt="" src={footerlogo}></img>
          </div>
        )}
      </div>
    );
  }
}
export default App;

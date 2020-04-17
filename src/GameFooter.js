import React, { Component } from "react";

let styleTemplate = {
  display: "flex",
  justifyContent: "center",
};

const leftSword = `<=)====>`;
const rightSword = `<====(=>`;

class GameFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", words: this.props.words };
  }

  //this function runs a check on if the word in the input matches the word in this components words array (which is App state.activeWords), and if so runs the parent function of checkValue, removing it from activeWords array, then clears the input field and adds score via prop passed from App
  checkValue = (event) => {
    const index = this.state.words.indexOf(event.target.value);
    if (index > -1) {
      this.props.checkValue(event.target.value);
      this.setState({ value: "" });
      event.target.value = "";
      this.props.addScore();
    }
  };

  //every keystroke in input field will check if input matches word and also populate words back to limit defined by prop passed from App
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.checkValue(event);
    this.setState({ words: this.props.words });
    this.props.autoFeed();
  };

  //start game
  startGame = () => {
    this.props.startGame();
    this.props.gameStartWords();
  };

  //renders actual game start button as long as the current state isn't game running
  gameStartButton = () => {
    if (!this.props.gameRunning) {
      return (
        <div style={styleTemplate}>
          <button
            onClick={this.startGame}
            style={{ height: 40, borderColor: "gray", borderWidth: 5 }}
          >
            Start game
          </button>
        </div>
      );
    }
  };

  //constant running check to see when timer runs out
  componentDidUpdate = () => {
    if (this.props.timer === 0) {
      this.props.gameEnd();
    }
  };

  //conditionally render save button to only happen if they scored a new high score
  saveButton = () => {
    if (this.props.showSave === true) {
      return (
        <div style={styleTemplate}>
          <button onClick={this.props.saveUser}>Save your score</button>
        </div>
      );
    }
  };

  //condtionally render game intro, game outro, or game play screen
  gameInfo = () => {
    if (this.props.firstRound === false) {
      return (
        <div>
          <div style={styleTemplate}>
            <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
              YOU DID IT! Maybe. I mean, I can't really tell...but click the
              save button to save if you have a new highscore.
            </h3>
          </div>
          <div style={styleTemplate}>
            <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
              Someday, probably, we will find a way to restart your game from
              here. For now, refresh and log in again!
            </h3>
          </div>
          <div style={styleTemplate}>
            <div style={styleTemplate}>
              <p style={{ color: "white" }}>
                ::::::::Current Score::::::::<br></br>
                {leftSword} {this.props.currentScore} {rightSword}
              </p>
            </div>
          </div>
        </div>
      );
    }
    if (this.props.gameRunning === true) {
      return (
        <div>
          <div style={styleTemplate}>
            <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
              Type the any of the following words in the space below to attack:
            </h3>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={styleTemplate}>
            <h2 style={{ color: "white", fontFamily: "Chalkduster" }}>
              Welcome to KeySword!
            </h2>
          </div>
          <div style={styleTemplate}>
            <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
              A wild skeleton has attacked the city. You, a brave Knight, must
              defend the villagers by attacking with words!
            </h3>
          </div>
          <div style={styleTemplate}>
            <p style={{ color: "white", fontFamily: "Chalkduster" }}>
              Why, you might ask? Because that's something we thought we could
              actually code. It turns out we were...kind of right!<br></br>
              --------------------------------------Click the start game button
              below to begin!------------------------------------
            </p>
          </div>
        </div>
      );
    }
  };

  //condtionally render the timer only when game is running
  gameTimerShow = () => {
    if (this.props.gameRunning === true) {
      return (
        <div>
          <div style={styleTemplate}>
            <h3 style={{ color: "red", fontFamily: "Chalkduster" }}>
              Time left in seconds: |{this.props.timer}|
            </h3>
          </div>
          <div style={styleTemplate}>
            <p style={{ color: "white" }}>
              ::::::::Current Score::::::::<br></br>
              {leftSword} {this.props.currentScore} {rightSword}
            </p>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.gameInfo()}
        {this.saveButton()}

        <div style={styleTemplate}>
          <h3 style={{ color: "lightgray", fontFamily: "Futura" }}>
            {this.props.words.join(", ")}
          </h3>
        </div>
        {/* <div style={styleTemplate}>
          <p style={{ color: "white" }}>
            {leftSword} {this.props.currentScore} {rightSword}
          </p>
        </div>
        <div style={styleTemplate}>
          <p style={{ color: "white" }}>Current Score</p>
        </div> */}
        <div style={styleTemplate}>
          <form autoComplete="off">
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              style={{ height: 20, borderColor: "gray", borderWidth: 5 }}
            />
          </form>
        </div>
        {this.gameStartButton()}
        {this.gameTimerShow()}
        <div style={styleTemplate}>
          <h4 style={{ color: "white", fontFamily: "Chalkduster" }}>
            {this.props.userName}'s current highscore:{this.props.highScore}
          </h4>
        </div>
        <button onClick={this.props.logOut}>Log Out</button>
      </div>
    );
  }
}
export default GameFooter;

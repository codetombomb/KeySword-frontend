import React, { Component } from "react";

let styleTemplate = {
  display: "flex",
  justifyContent: "center",
};

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

  startGame = () => {
    this.props.startGame();
    this.props.gameStartWords();
  };

  gameStartButton = () => {
    if (!this.props.gameRunning) {
      return (
        <button
          onClick={this.startGame}
          style={{ height: 40, borderColor: "gray", borderWidth: 5 }}
        >
          Start game
        </button>
      );
    }
  };

  componentDidUpdate = () => {
    if (this.props.timer === 0) {
      this.props.gameEnd();
    }
  };

  saveButton = () => {
    if (this.props.showSave === true) {
      return <button onClick={this.props.saveUser}>Save your score</button>;
    }
  };

  gameInfo = () => {
    if (this.props.gameRunning === true) {
      return (
        <div style={styleTemplate}>
          <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
            Type the any of the following words in the space below to attack:
          </h3>
        </div>
      );
    } else {
      return (
        <div>
          <div style={styleTemplate}>
            <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
              Welcome to KeySword!
            </h3>
          </div>
          <div style={styleTemplate}>
            <p style={{ color: "white", fontFamily: "Chalkduster" }}>
              A wild skeleton has attacked the city. You, a brave Knight, must
              defend the villagers by attacking with words!
            </p>
          </div>
          <div style={styleTemplate}>
            <p style={{ color: "white", fontFamily: "Chalkduster" }}>
              Why, you might ask? Because that's something we thought we could
              actually do with React, and it turns out we were kind of right!
            </p>
          </div>
          <div style={styleTemplate}>
            <p style={{ color: "white", fontFamily: "Chalkduster" }}>
              Click start below to begin
            </p>
          </div>
        </div>
      );
    }
  };

  gameTimerShow = () => {
    if (this.props.gameRunning === true) {
      return (<div style={styleTemplate}>
        <h3 style={{ color: "red", fontFamily: "Chalkduster" }}>
          Time left in seconds: |{this.props.timer}|
        </h3>
      </div>)
    }
  }

  render() {
    return (
      <div>
        {this.saveButton()}
        {this.gameInfo()}
        {/* <div style={styleTemplate}>
          <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
            Type the any of the following words in the space below to attack:
          </h3>
        </div> */}
        <div style={styleTemplate}>
          <h3 style={{ color: "lightgray", fontFamily: "Futura" }}>
            {this.props.words.join(", ")}
          </h3>{" "}
        </div>
        <div style={styleTemplate}>
          <p style={{ color: "white" }}>
            Current score: {this.props.currentScore}
          </p>
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
          {this.gameStartButton()}
        </div>
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

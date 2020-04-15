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

  render() {
    return (
      <div>
        <div style={styleTemplate}>
          <h3 style={{ color: "white", fontFamily: "Chalkduster" }}>
            Type the any of the following words in the space below to attack:
          </h3>
        </div>
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
          <button
            onClick={this.props.gameStartWords}
            style={{ height: 40, borderColor: "gray", borderWidth: 5 }}
          >
            Start game
          </button>
        </div>
        <div style={styleTemplate}>
          <h3 style={{ color: "red", fontFamily: "Chalkduster" }}>
            Countdown Timer will go here
          </h3>{" "}
        </div>
      </div>
    );
  }
}
export default GameFooter;

import React, { Component } from "react";

class GameFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", words: this.props.words };
  }

  checkValue = (event) => {
    const index = this.state.words.indexOf(event.target.value);
    if (index > -1) {
      console.log(event.target.value);
      this.props.checkValue(event.target.value);
      this.setState({ value: "" });
      event.target.value = "";
      this.props.addScore();
    }
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
    this.checkValue(event);
    this.setState({ words: this.props.words });
    this.props.autoFeed();
  };

  render() {
    return (
      <div>
        <p style={{ color: "white" }}>
          Current score: {this.props.currentScore}
        </p>
        <button onClick={this.props.gameStartWords}>Start game</button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <h5 style={{ color: "white", fontFamily: "Chalkduster" }}>
            Type the any of the following words in the space below to attack:
          </h5>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3 style={{ color: "lightgray", fontFamily: "Futura" }}>
            {this.props.words.join(", ")}
          </h3>{" "}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3 style={{ color: "red", fontFamily: "Chalkduster" }}>
            Countdown Timer will go here
          </h3>{" "}
        </div>
      </div>
    );
  }
}
export default GameFooter;

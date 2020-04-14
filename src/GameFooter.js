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
      this.setState(this.state.words.splice(index, 1));
      this.setState({ value: "" });
      event.target.value = "";
    }
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
    this.checkValue(event);
  };

  render() {
    return (
      <div
      
      >
        <div
          style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
          {" "}
          <h3>Game Footer</h3>{" "}
        </div>
        <div
          style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
          <form>
            <input type="text" name="name" onChange={this.handleChange} />
          </form>
        </div>
      </div>
    );
  }
}
export default GameFooter;

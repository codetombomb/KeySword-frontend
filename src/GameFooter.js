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
      this.props.checkValue(event.target.value)
      this.setState({ value: "" });
      event.target.value = "";
    }
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
    this.checkValue(event);
    this.setState({words: this.props.words})
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
          <h5 style={{color:'white'}}>Type the any of the following words in the space below to attack:</h5>
          <button onClick={this.props.addWord}></button>
        </div>
        <div
          style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
        
          <h3 style={{color:'red'}}>{this.props.words.join(", ")}</h3>{" "}
        </div>
        <div
          style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
          <form autoComplete="off">
            <input type="text" name="name" onChange={this.handleChange} />
          </form>
        </div>
        <div
          style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
        
          <h3 style={{color:'red'}}>{this.props.words.join(", ")}</h3>{" "}
        </div>
      </div>
    );
  }
}
export default GameFooter;

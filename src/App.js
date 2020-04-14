import React, { Component } from 'react';
import GameHeader from './GameHeader'
import GameShow from './GameShow'
import GameFooter from './GameFooter'

class App extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  componentDidMount(){
    //capture details of gameplay and user information
  }

  render() {
    return(
      <div className="App">
      <GameHeader />
      <GameShow />
      <GameFooter />
    </div>
    )
  }
}
export default App;

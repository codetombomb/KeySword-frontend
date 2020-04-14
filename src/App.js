import React, { Component } from 'react';
import GameHeader from './GameHeader'
import GameShow from './GameShow'
import GameFooter from './GameFooter'

let baseURL = 'http://localhost:3000/'
class App extends Component {
  constructor(){
    super();
    this.state = {
      level: [],
      monsters: [],
      users: [],
      activeUser: [],
      words: [],
      bossWords: [],
      
    }
  }
  componentDidMount(){
    this.fetchLevel()
    //capture details of gameplay and user information
  }
  
  fetchLevel = () => {
    return fetch(baseURL + "levels")
    .then(resp => resp.json())
    .then(level => this.setState({level}))
  }

  

  render() {
    return(
      <div className="App">
      <GameHeader />
      <GameShow words={this.state.level}/>
      <GameFooter />
    </div>
    )
  }
}
export default App;

import React, { Component } from 'react';
import GameHeader from './GameHeader'
import GameShow from './GameShow'
import GameFooter from './GameFooter'
import UserBar from './UserBar'

let baseURL = 'http://localhost:3000/'
class App extends Component {
  constructor(){
    super();
    this.state = {
      level: [],
      monsters: [],
      users: [],
      activeUser: ["user"],
      words: [],
      bossWords: [],
      activeWords: ["walter", "fish"]
      
    }
  }
  componentDidMount(){
    this.fetchLevel()
    this.fetchUsers()
    //capture details of gameplay and user information
  }
  
  fetchLevel = () => {
    return fetch(baseURL + "levels")
    .then(resp => resp.json())
    .then(level => this.setState({level}))
  }
  fetchUsers = () => {
    return fetch(baseURL + "users")
    .then(resp => resp.json())
    .then(users => this.setState({users}))
  }
  

  checkLogIn = () => {
    if (this.state.activeUser.length > 0 ) {
      return <GameShow words={this.state.level}/>
    } else {
      return <UserBar />
    }
  }

  render() {
    return(
      <div className="App">
      <GameHeader />
      {/* <GameShow words={this.state.level}/> */}
      {this.checkLogIn()}
      <GameFooter 
        words={this.state.activeWords}
      />
    </div>
    )
  }
}
export default App;

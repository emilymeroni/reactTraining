import React, { Component } from 'react';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';

class App extends Component {
  state = {
    username: 'pasticcio'
  }

  changeNameHandler = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput changed={this.changeNameHandler}/>
        <UserOutput username={this.state.username}/>
      </div>
    );
  }
}

export default App;

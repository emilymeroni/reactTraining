import React, { Component } from 'react';
import './App.css';
import CharComponent from './CharComponent/CharComponent';
import ValidationComponent from './ValidationComponent/ValidationComponent';

class App extends Component {

  state = {
    text: []
  }

  inputChangeHandler = (event) => {
    this.setState({
      text: [...event.target.value]
    })
  }

  charClickHandler = (index) => {
    const newChars = [...this.state.text];
    newChars.splice(index, 1);
    this.setState({
      text: newChars
    });
  }

  render() {
    const charBoxes = this.state.text.map((char, index) => {
      return (
        <CharComponent
          char={char}
          key={index}
          clicked={() => this.charClickHandler(index)} />
      )
    });

    return (
      <div className="App">
        <input value={this.state.text.join('')} onChange={(event) => this.inputChangeHandler(event)} />
        <ValidationComponent text={this.state.text} />
        <p>The length of the text is: {this.state.text.length}</p>
        {charBoxes}
      </div>
    );
  }
}

export default App;

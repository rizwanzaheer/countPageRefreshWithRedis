import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: '' };
  }
  componentDidMount() {
    axios.get('http://localhost:4000/insert').then(({data}) => {
      this.setState({ counter: data.count });
    });
  }
  render() {
    console.log('this.state is: ', this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <h3>Total Page Refresh Count is: {this.state.counter}</h3>

      </div>
    );
  }
}

export default App;

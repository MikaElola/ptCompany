import React, { Component } from 'react';
import './App.css';
import Router from './component/Router';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount =  () => {

    //maybe fetch here or create a service component for that
    //set to states cust and train
  };
  //pass states to each component and call table component with props passed?

  render() {
    return (
      <div className="App">
        <Router></Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Logo from '../images/Logo.png';

class firstPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 style={{color: '#000000', fontWeight: 'bold'}}>Ronnien Personal Trainer - palvelut!</h1>
        <img style={{maxWidth: 40 + "vw", margin: 5 + 'vw'}} src={Logo} alt="Logo"></img>
        </header>
      </div>
    );
  }
}

export default firstPage;

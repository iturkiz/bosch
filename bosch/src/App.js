import React, { Component } from 'react';
import './App.css';

import { data } from './scans.js';

class App extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="App">
        <iframe
          title="bosch"
          src="p5\boschp5\index.html"
          width="600px"
          height="400px"
        />
      </div>
    );
  }
}

export default App;

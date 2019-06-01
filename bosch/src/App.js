import React from 'react';
import './App.css';

import { data } from './scans.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{console.log(data[0])}</p>
      </header>
    </div>
  );
}

export default App;

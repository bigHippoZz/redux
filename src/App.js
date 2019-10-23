import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { useCallback,useContext,useEffect,useMemo,useReducer,useRef,useState }  from 'react';
import { curry,compose } from './Function';
const App = () => {
  
  useEffect(() => {
    
    return () => {
      
    }

  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p  >
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React   
        </a>
      </header>
    </div>
  );
}

export default App;


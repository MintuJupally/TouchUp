/*global chrome*/
import './App.css';
import { useEffect } from 'react';

import logo1 from './logo.svg';

function App() {
  useEffect(() => {
    var event = new CustomEvent('FromComponent');
    window.dispatchEvent(event);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={chrome.runtime.getURL('/build/static/media/logo.svg')}
          className="App-logo"
          alt="logo"
        />
        <p>
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

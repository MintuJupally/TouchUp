/*global chrome*/
import './App.css';
import { useEffect, useRef, useState } from 'react';

import Toolbar from './components/Toolbar';
import FocusDiv from './components/FocusDiv';

let activeMode_g = false;
let currentHover_g = null;

const App = () => {
  const currentHover = useRef(null);
  const toolbarRef = useRef(null);

  const [activeMode, setActiveMode] = useState(false);

  const elementFinder = (e) => {
    if (currentHover_g === e.target) return;

    const bounds = e.target.getBoundingClientRect();

    console.log(bounds);

    let focusElementLeft = document.getElementById('TouchUp-focus-left');
    focusElementLeft.style.left = `${bounds.x}px`;
    focusElementLeft.style.height = `${bounds.height}px`;
    focusElementLeft.style.top = `${bounds.y}px`;

    let focusElementRight = document.getElementById('TouchUp-focus-right');
    focusElementRight.style.left = `${bounds.x + bounds.width - 1}px`;
    focusElementRight.style.height = `${bounds.height}px`;
    focusElementRight.style.top = `${bounds.y}px`;

    let focusElementTop = document.getElementById('TouchUp-focus-top');
    focusElementTop.style.left = `${bounds.x}px`;
    focusElementTop.style.width = `${bounds.width}px`;
    focusElementTop.style.top = `${bounds.y}px`;

    let focusElementBottom = document.getElementById('TouchUp-focus-bottom');
    focusElementBottom.style.left = `${bounds.x}px`;
    focusElementBottom.style.width = `${bounds.width}px`;
    focusElementBottom.style.top = `${bounds.y + bounds.height - 1}px`;

    if (currentHover_g) {
      // currentHover.current.classList.remove('TouchUp-hovered');
    }

    currentHover.current = currentHover_g = e.target;
    // currentHover.current.classList.add('TouchUp-hovered');
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      activeMode_g = !activeMode_g;
      setActiveMode(activeMode_g);

      let toolbarElement = document.getElementById('TouchUp-toolbar');

      if (request.method === 'ping') {
        if (activeMode_g) {
          document.addEventListener('mousemove', elementFinder);
          toolbarElement.style.display = 'flex';
        } else {
          document.removeEventListener('mousemove', elementFinder);
          currentHover.current = currentHover_g = null;
          toolbarElement.style.display = 'none';
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <Toolbar ref={toolbarRef} />
      <FocusDiv activeMode={activeMode} />
    </div>
  );
};

export default App;

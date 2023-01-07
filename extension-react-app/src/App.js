/*global chrome*/
import './App.css';
import { useEffect, useRef, useState } from 'react';

import Toolbar from './components/Toolbar';
import FocusDiv from './components/FocusDiv';
import ElementProfile from './components/ElementProfile';

let activeMode_g = false;
let currentHover_g = null;
let selectedElement_g = null;

const App = () => {
  const currentHover = useRef(null);
  const toolbarRef = useRef(null);
  const selectedElementRef = useRef(null);

  const [activeMode, setActiveMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const [styles, setStyles] = useState({});

  const elementFinder = (e) => {
    if (currentHover_g === e.target) return;

    if (
      e.target.classList.contains('TouchUp-focus-element') ||
      e.target.classList.contains('TouchUp-elementprofile')
    ) {
      return;
    }

    const toolbarElement = document.getElementById('TouchUp-toolbar');
    if (toolbarElement === e.target || toolbarElement.contains(e.target)) {
      [
        'TouchUp-focus-left',
        'TouchUp-focus-right',
        'TouchUp-focus-top',
        'TouchUp-focus-bottom',
      ].forEach(
        (id) => (document.getElementById(id).style.borderWidth = '0px')
      );

      return;
    }

    const bounds = e.target.getBoundingClientRect();

    let focusElementLeft = document.getElementById('TouchUp-focus-left');
    focusElementLeft.style.left = `${bounds.x}px`;
    focusElementLeft.style.height = `${bounds.height}px`;
    focusElementLeft.style.top = `${bounds.y}px`;
    focusElementLeft.style.borderWidth = '1px';

    let focusElementRight = document.getElementById('TouchUp-focus-right');
    focusElementRight.style.left = `${bounds.x + bounds.width - 1}px`;
    focusElementRight.style.height = `${bounds.height}px`;
    focusElementRight.style.top = `${bounds.y}px`;
    focusElementRight.style.borderWidth = '1px';

    let focusElementTop = document.getElementById('TouchUp-focus-top');
    focusElementTop.style.left = `${bounds.x}px`;
    focusElementTop.style.width = `${bounds.width}px`;
    focusElementTop.style.top = `${bounds.y}px`;
    focusElementTop.style.borderWidth = '1px';

    let focusElementBottom = document.getElementById('TouchUp-focus-bottom');
    focusElementBottom.style.left = `${bounds.x}px`;
    focusElementBottom.style.width = `${bounds.width}px`;
    focusElementBottom.style.top = `${bounds.y + bounds.height - 1}px`;
    focusElementBottom.style.borderWidth = '1px';

    if (currentHover_g) {
      // currentHover.current.classList.remove('TouchUp-hovered');
    }

    currentHover.current = currentHover_g = e.target;
    // currentHover.current.classList.add('TouchUp-hovered');
  };

  const elementSelector = (e) => {
    const toolbarElement = document.getElementById('TouchUp-toolbar');
    const elementProfile = document.getElementById('TouchUp-elementprofile');

    if (
      e.target === toolbarElement ||
      e.target === elementProfile ||
      toolbarElement?.contains(e.target) ||
      elementProfile?.contains(e.target)
    ) {
      return;
    }

    console.log('action...');

    e.preventDefault();

    if (selectedElementRef.current === e.target) return;

    if (selectedElementRef.current) {
      selectedElementRef.current.classList.remove('TouchUp-selected');
    }

    selectedElementRef.current = selectedElement_g = e.target;
    selectedElementRef.current.classList.add('TouchUp-selected');

    setSelectedElement(selectedElement_g);
  };

  const updateStyle = (id, style) => {
    const curr = { ...styles };
    curr[id] = style;

    setStyles(curr);
  };

  const applyStyle = (prop, val) => {
    if (selectedElementRef.current)
      selectedElementRef.current.style[prop] = val;
  };

  useEffect(() => {
    console.log({ styles });
  }, [styles]);

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
          [
            'TouchUp-focus-left',
            'TouchUp-focus-right',
            'TouchUp-focus-top',
            'TouchUp-focus-bottom',
          ].forEach(
            (id) => (document.getElementById(id).style.display = 'block')
          );

          document.addEventListener('mousemove', elementFinder);
          document.addEventListener('click', elementSelector);

          toolbarElement.style.display = 'flex';
        } else {
          document.removeEventListener('mousemove', elementFinder);
          document.removeEventListener('click', elementSelector);
          currentHover.current = currentHover_g = null;
          toolbarElement.style.display = 'none';

          [
            'TouchUp-focus-left',
            'TouchUp-focus-right',
            'TouchUp-focus-top',
            'TouchUp-focus-bottom',
          ].forEach(
            (id) => (document.getElementById(id).style.display = 'none')
          );
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <Toolbar ref={toolbarRef} />
      <FocusDiv activeMode={activeMode} />
      <ElementProfile
        selectedElement={selectedElement}
        updateGlobalStyle={updateStyle}
        applyStyle={applyStyle}
      />
    </div>
  );
};

export default App;

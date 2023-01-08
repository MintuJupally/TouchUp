/*global chrome*/
import './App.css';
import { useEffect, useRef, useState } from 'react';

import Toolbar from './components/Toolbar';
import FocusDiv from './components/FocusDiv';
import ElementProfile from './components/ElementProfile';
import DesignList from './components/DesignList';
import SelectFrame from './components/SelectFrame';

let activeMode_g = false;
let currentHover_g = null;
let selectedElement_g = null;

const App = () => {
  const currentHover = useRef(null);
  const toolbarRef = useRef(null);
  const selectedElementRef = useRef(null);
  const selectFrameRef = useRef(null);

  const [activeMode, setActiveMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const [styles, setStyles] = useState({});

  const elementFinder = (e) => {
    if (currentHover_g === e.target) return;

    if (
      e.target.classList.contains('TouchUp-focus-element') ||
      e.target.classList.contains('TouchUp-elementprofile') ||
      e.target.classList.contains('TouchUp-select-frame')
    ) {
      return;
    }

    const toolbarElement = document.getElementById('TouchUp-toolbar');
    if (toolbarElement === e.target || toolbarElement?.contains(e.target)) {
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

    // console.log('action...');

    e.preventDefault();
    e.stopPropagation();

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
    chrome.storage.sync.set({ [`${window.location.href}`]: curr }, () => {});
  };

  const applyStyle = (prop, val) => {
    if (selectedElementRef.current)
      selectedElementRef.current.style[prop] = val;
  };

  const decodeStyles = (data) => {
    console.log({ data });

    Object.keys(data).forEach((id) => {
      const identifier = id.split('_');

      let element = document.body;
      for (let i = 0; i < identifier.length; i++) {
        element = element.children[identifier[i]];
      }

      console.log({ element });
      Object.keys(data[id]).forEach((prop) => {
        element.style[prop] = data[id][prop];
      });
    });
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
        const selected =
          document.getElementsByClassName('TouchUp-selected')?.[0];

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
          document.addEventListener('click', elementSelector, true);

          toolbarElement.style.display = 'flex';
          if (selected) selected.style.borderWidth = '1px';
        } else {
          document.removeEventListener('mousemove', elementFinder);
          document.removeEventListener('click', elementSelector, true);
          currentHover.current = currentHover_g = null;
          toolbarElement.style.display = 'none';

          if (selected) selected.style.borderWidth = '0px';

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

    chrome.storage.sync.get(window.location.href, (data) => {
      decodeStyles(data[window.location.href]);

      setStyles(data[window.location.href]);
    });
  }, []);

  return (
    <div className="App">
      {/* <Toolbar ref={toolbarRef} /> */}
      <FocusDiv activeMode={activeMode} />
      {activeMode && (
        <ElementProfile
          selectedElement={selectedElement}
          updateGlobalStyle={updateStyle}
          applyStyle={applyStyle}
          styles={styles}
        />
      )}

      {activeMode && <DesignList />}
      {activeMode && selectedElement && (
        <SelectFrame
          bounds={selectedElementRef.current.getBoundingClientRect()}
          ref={selectFrameRef}
        />
      )}
    </div>
  );
};

export default App;

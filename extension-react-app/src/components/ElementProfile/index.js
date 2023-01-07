/*global chrome*/

import './index.css';
import { useEffect, useState } from 'react';

const ElementProfile = ({
  selectedElement,
  updateGlobalStyle,
  applyStyle,
  styles,
}) => {
  const [elementIdentifier, setElementIdentifier] = useState(null);
  const [style, setStyle] = useState({});

  const identifyElement = (el) => {
    if (!el) return;

    let stack = [el];

    while (stack[stack.length - 1].tagName !== 'BODY') {
      stack.push(stack[stack.length - 1].parentElement);
    }

    stack.reverse();
    // console.log({ stack });

    let identifier = [];

    for (let i = 0; i < stack.length - 1; i++) {
      const children = stack[i].children;

      for (let j = 0; j < children.length; j++) {
        // console.log(j, children[j], stack[i + 1]);

        if (children[j] === stack[i + 1]) {
          identifier.push(j);
          break;
        }
      }
    }

    // console.log({ identifier });
    setElementIdentifier(identifier.join('_'));
  };

  useEffect(() => {
    identifyElement(selectedElement);
  }, [selectedElement]);

  const updateStyle = (prop, val) => {
    applyStyle(prop, val);

    const curr = { ...style };

    curr[prop] = val;
    setStyle(curr);
  };

  useEffect(() => {
    if (elementIdentifier) {
      updateGlobalStyle(elementIdentifier, style);
    }
    console.log({ style });
  }, [style]);

  if (!selectedElement || !elementIdentifier) return null;

  return (
    <div
      id="TouchUp-elementprofile"
      style={{
        backgroundColor: 'white',
        position: 'fixed',
        bottom: 10,
        right: 10,
        width: '300px',
        height: '300px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        color: 'black',
        padding: '20px',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: '500',
          borderBottom: '1px solid black',
        }}
      >{`< ${selectedElement.tagName.toLowerCase()} >`}</div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p
          style={{
            width: '140px',
            paddingRight: '10px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          Color
        </p>
        <input
          className="TouchUp-style-input"
          style={{ width: '150px' }}
          type="color"
          value={styles?.[elementIdentifier]?.color ?? 'black'}
          onChange={(e) => {
            updateStyle('color', e.target.value);
          }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p
          style={{
            width: '140px',
            paddingRight: '10px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          Background Color
        </p>
        <input
          className="TouchUp-style-input"
          style={{ width: '150px' }}
          type="color"
          value={styles?.[elementIdentifier]?.backgroundColor ?? 'black'}
          onChange={(e) => {
            updateStyle('backgroundColor', e.target.value);
          }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p
          style={{
            width: '140px',
            paddingRight: '10px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          Font Size
        </p>
        <input
          className="TouchUp-style-input"
          style={{ width: '150px' }}
          type="number"
          onChange={(e) => {
            updateStyle('font-size', e.target.value + 'px');
          }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p
          style={{
            width: '140px',
            paddingRight: '10px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          Border Radius
        </p>
        <input
          className="TouchUp-style-input"
          style={{ width: '150px' }}
          type="number"
          onChange={(e) => {
            updateStyle('border-radius', e.target.value + 'px');
          }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p
          style={{
            width: '140px',
            paddingRight: '10px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          Font
        </p>
        <input
          className="TouchUp-style-input"
          style={{ width: '150px' }}
          type="string"
          onChange={(e) => {
            updateStyle('font', e.target.value);
          }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <p
          style={{
            width: '140px',
            paddingRight: '10px',
            margin: 0,
            textAlign: 'left',
          }}
        >
          Background Image
        </p>
        <input
          className="TouchUp-style-input"
          style={{ width: '150px' }}
          type="string"
          onChange={(e) => {
            updateStyle('background-image', 'url(' + e.target.value + ')');
          }}
        />
      </div>

      <div class="dropdown">
        <button class="dropbtn">Font Weight</button>
        <div class="dropdown-content">
          <button
            onClick={() => {
              updateStyle('font-weight', 'bold');
            }}
          >
            Bold
          </button>

          <button
            onClick={() => {
              updateStyle('font-weight', 'italic');
            }}
          >
            {' '}
            italic
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementProfile;

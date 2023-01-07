import { useEffect, useState } from 'react';

const ElementProfile = ({ selectedElement, updateGlobalStyle, applyStyle }) => {
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

  if (!selectedElement) return null;

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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <b>Color: </b>
      <input
        type="color"
        onChange={(e) => {
          updateStyle('color', e.target.value);
        }}
      />

      <b>Background Color: </b>
      <input
        type="color"
        onChange={(e) => {
          updateStyle('backgroundColor', e.target.value);
        }}
      />
    </div>
  );
};

export default ElementProfile;

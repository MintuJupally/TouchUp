import { useEffect } from 'react';

const FocusDiv = () => {
  return (
    <>
      <div
        id="TouchUp-focus-top"
        className="TouchUp-focus-element"
        style={{
          position: 'absolute',
        }}
      ></div>
      <div
        id="TouchUp-focus-left"
        className="TouchUp-focus-element"
        style={{
          position: 'absolute',
        }}
      ></div>
      <div
        id="TouchUp-focus-right"
        className="TouchUp-focus-element"
        style={{
          position: 'absolute',
        }}
      ></div>
      <div
        id="TouchUp-focus-bottom"
        className="TouchUp-focus-element"
        style={{
          position: 'absolute',
        }}
      ></div>
    </>
  );
};

export default FocusDiv;

import { useEffect } from 'react';

const SelectFrame = ({ bounds }) => {
  useEffect(() => {
    console.log({ bounds });
  }, [bounds]);

  return (
    <>
      <div
        className="TouchUp-select-frame"
        style={{
          width: '2px',
          height: bounds?.height ? `${bounds.height}px` : '0px',
          top: bounds?.y ? `${bounds.y}px` : '0px',
          left: bounds?.x ? `${bounds.x}px` : '0px',
          position: 'absolute',
          backgroundColor: 'greenyellow',
        }}
      ></div>
      <div
        className="TouchUp-select-frame"
        style={{
          width: '2px',
          height: bounds?.height ? `${bounds.height}px` : '0px',
          top: bounds?.y ? `${bounds.y}px` : '0px',
          left: bounds?.x ? `${bounds.x + bounds.width}px` : '0px',
          position: 'absolute',
          backgroundColor: 'greenyellow',
        }}
      ></div>
      <div
        className="TouchUp-select-frame"
        style={{
          height: '2px',
          width: bounds?.width ? `${bounds.width}px` : '0px',
          top: bounds?.y ? `${bounds.y - 2}px` : '0px',
          left: bounds?.x ? `${bounds.x}px` : '0px',
          position: 'absolute',
          backgroundColor: 'greenyellow',
        }}
      ></div>
      <div
        className="TouchUp-select-frame"
        style={{
          height: '2px',
          width: bounds?.width ? `${bounds.width}px` : '0px',
          top: bounds?.y ? `${bounds.y + bounds.height}px` : '0px',
          left: bounds?.x ? `${bounds.x}px` : '0px',
          position: 'absolute',
          backgroundColor: 'greenyellow',
        }}
      ></div>
    </>
  );
};

export default SelectFrame;

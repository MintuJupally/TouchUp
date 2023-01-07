const Toolbar = () => {
  return (
    <div
      id="TouchUp-toolbar"
      style={{
        position: 'fixed',
        top: 10,
        left: 10,
        height: 'calc(100vh - 20px)',
        borderRadius: '5px',
        width: '40px',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="TouchUp-toolbar"
        style={{
          backgroundColor: 'white',
          left: 30,
          borderRadius: '5px',
          width: '100%',
          height: '100%',
        }}
      >
        <ul></ul>
      </div>
    </div>
  );
};

export default Toolbar;

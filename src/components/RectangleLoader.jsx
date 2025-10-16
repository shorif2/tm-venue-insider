const RectangleLoader = () => {
  const spinnerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "16px",
    height: "16px",
    fontSize: "10px",
  };

  const rectStyle = {
    height: "100%",
    width: "4px",
    backgroundColor: "#6B6B6B",
    opacity: "0.2",
    borderRadius: "4px",
    transformOrigin: "center",
  };

  const animationStyle = {
    animation: "spinner-bounce 0.6s infinite ease-in-out",
  };

  return (
    <div className="absolute left-1/2 top-1/3">
      <div
        style={{
          position: "relative",
        }}
        className=""
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "20px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div style={spinnerStyle}>
            <div
              style={{
                ...rectStyle,
                ...animationStyle,
                animationDelay: "0s",
              }}
            />
            <div
              style={{
                ...rectStyle,
                ...animationStyle,
                animationDelay: "0.15s",
              }}
            />
            <div
              style={{
                ...rectStyle,
                ...animationStyle,
                animationDelay: "0.3s",
              }}
            />
          </div>
        </div>
        <br />
        <br />
        <span className="font-medium">Loading...</span>
      </div>
      <style>{`
        @keyframes spinner-bounce {
          0%, 100% {
            transform: scaleY(0.4);
            opacity: 0.8;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default RectangleLoader;

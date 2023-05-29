import React from "react";

const ActionsContainer = ({
  onStart,
  onStop,
  running,
}: {
  onStart: Function;
  onStop: Function;
  running: boolean;
}) => {
  return (
    <div>
      {running ? (
        <button onClick={() => onStop()}>Shutdown Server</button>
      ) : (
        <button onClick={() => onStart()}>Start Server</button>
      )}
    </div>
  );
};

export default ActionsContainer;

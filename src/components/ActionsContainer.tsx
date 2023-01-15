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
        <button onClick={() => onStop()}>Desligar Servidor</button>
      ) : (
        <button onClick={() => onStart()}>Ligar Servidor</button>
      )}
    </div>
  );
};

export default ActionsContainer;

import React, { useState } from "react";
import { sendCommand } from "../requests/sendCommand";

const SendCommand = () => {
  const [command, setCommand] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setResult("Sending command 🤓...");

    sendCommand(command).then(() => {
      setResult("Command sent. Wait a second til sending another one.");
      setTimeout(() => {
        setResult("");
        setCommand("");
      }, 1 * 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {result && <p>{result}</p>}
      <p>Send a command to the server:</p>
      <input
        title="Command"
        value={command}
        disabled={!!result}
        onChange={(e) => setCommand((data: any) => e.target.value)}
      />

      <input title="Send" type="submit" disabled={!!result} />
    </form>
  );
};

export default SendCommand;

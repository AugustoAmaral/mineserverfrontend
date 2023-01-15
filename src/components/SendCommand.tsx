import React, { useState } from "react";
import { sendCommand } from "../requests/sendCommand";

const SendCommand = () => {
  const [command, setCommand] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setResult("Enviando...");

    sendCommand(command).then(() => {
      setResult("Comando enviado. Aguarde 2 segundos para enviar outro");
      setTimeout(() => {
        setResult("");
      }, 2 * 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {result && <p>{result}</p>}
      <p>Enviar um comando:</p>
      <input
        title="Comando"
        value={command}
        disabled={!!result}
        onChange={(e) => setCommand((data: any) => e.target.value)}
      />

      <input title="Enviar" type="submit" disabled={!!result} />
    </form>
  );
};

export default SendCommand;

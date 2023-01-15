import React, { useState } from "react";
import { updateAutoRestart } from "../requests/updateAutoRestart";

const AutoRestart = ({
  autoRestart,
  onChangeAutoRestart,
}: {
  autoRestart: boolean;
  onChangeAutoRestart: Function;
}) => {
  const [sending, setSending] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSending(true);

    updateAutoRestart().then(() => {
      setTimeout(() => {
        setSending(false);
        onChangeAutoRestart();
      }, 2 * 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ borderStyle: "dotted" }}>
      <p>
        {sending
          ? "Enviando comando..."
          : autoRestart
          ? "Auto restart habilitado, caso o servidor crashe, ele reiniciará automaticamente"
          : "Auto restart desabilitado, caso o servidor crashe, ele permanecerá fechado"}
      </p>

      <button type="submit" disabled={sending}>
        {autoRestart ? "Desligar" : "Ligar"} auto restart?
      </button>
    </form>
  );
};

export default AutoRestart;

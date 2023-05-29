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
          ? "Sending command..."
          : autoRestart
          ? "Auto restart enabled, in case of crash or close, the server will restart automatically"
          : "Auto restart disabled, in case of crash or close, the server will keep close"}
      </p>

      <button type="submit" disabled={sending}>
        {autoRestart ? "Turn off" : "Turn on"} auto restart?
      </button>
    </form>
  );
};

export default AutoRestart;

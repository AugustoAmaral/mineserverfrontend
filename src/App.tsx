import React, { useState, useEffect } from "react";
import ActionsContainer from "./components/ActionsContainer";
import LogsContainer from "./components/LogsContainer";
import StatusContainer from "./components/StatusContainer";
import { getLogFiles, LogFilesType } from "./requests/getLogFiles";
import { StatusType, getStatus } from "./requests/getStatus";
import { startServer } from "./requests/startServer";
import { stopServer } from "./requests/stopServer";

function App() {
  const [status, setStatus] = useState<StatusType | undefined>();
  const [logFiles, setLogFiles] = useState<LogFilesType | undefined>();

  useEffect(() => {
    getLogFiles().then((r) => setLogFiles(r));
    getStatus().then((r) => setStatus(r));
  }, []);

  const handleStartServer = () => {
    return startServer().then(() => {
      getLogFiles().then((r) => setLogFiles(r));
      getStatus().then((r) => setStatus(r));
    });
  };

  const handleStopServer = () => {
    return stopServer().then(() => {
      getLogFiles().then((r) => setLogFiles(r));
      getStatus().then((r) => setStatus(r));
    });
  };

  return (
    <div>
      <StatusContainer status={status} />
      <br />
      <ActionsContainer
        onStart={handleStartServer}
        onStop={handleStopServer}
        running={status?.running || false}
      />
      <br />
      <br />
      <LogsContainer logs={logFiles} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import LogsContainer from "./components/LogsContainer";
import StatusContainer from "./components/StatusContainer";
import { getLogFiles, LogFilesType } from "./requests/getLogFiles";
import { StatusType, getStatus } from "./requests/getStatus";

function App() {
  const [status, setStatus] = useState<StatusType | undefined>();
  const [logFiles, setLogFiles] = useState<LogFilesType | undefined>();

  useEffect(() => {
    getLogFiles().then((r) => setLogFiles(r));
    getStatus().then((r) => setStatus(r));
  }, []);

  return (
    <div>
      <StatusContainer status={status} />
      <br />
      <br />
      <LogsContainer logs={logFiles} />
    </div>
  );
}

export default App;

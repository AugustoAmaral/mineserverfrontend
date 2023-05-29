import React, { useState, useEffect } from "react";
import ActionsContainer from "./components/ActionsContainer";
import LogsContainer from "./components/LogsContainer";
import StatusContainer from "./components/StatusContainer";
import { getLogFiles, LogFilesType } from "./requests/getLogFiles";
import { StatusType, getStatus } from "./requests/getStatus";
import { startServer } from "./requests/startServer";
import { stopServer } from "./requests/stopServer";
import Login from "./Login";
import { UserData } from "./requests/login";
import { cleanLocalUser, loadLocalUser } from "./functions";
import SendCommand from "./components/SendCommand";
import AutoRestart from "./components/AutoRestart";

const loadUserInfo = () => {
  const user = loadLocalUser();
  if (user) {
    if (new Date().valueOf() > new Date(user.expireAt).valueOf()) {
      cleanLocalUser();
      return null;
    } else return user;
  }
  return null;
};

const clearUserInfo = () => {
  cleanLocalUser();
  window.location.reload();
};

function App() {
  const [status, setStatus] = useState<StatusType | undefined>();
  const [logFiles, setLogFiles] = useState<LogFilesType | undefined>();
  const [userData] = useState<UserData | null>(loadUserInfo());

  useEffect(() => {
    if (userData) {
      getLogFiles().then((r) => setLogFiles(r));
      getStatus().then((r) => setStatus(r));
    }
  }, [userData]);

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
  const handleToggleAutorestartCallback = () => {
    getLogFiles().then((r) => setLogFiles(r));
    getStatus().then((r) => setStatus(r));
  };

  return userData ? (
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
      <button onClick={clearUserInfo}>Logoff</button>
      <br />
      <br />
      <AutoRestart
        autoRestart={status?.autoRestart || false}
        onChangeAutoRestart={handleToggleAutorestartCallback}
      />
      {userData.admin && <SendCommand />}
      <br />
      <LogsContainer logs={logFiles} />
    </div>
  ) : (
    <Login />
  );
}

export default App;

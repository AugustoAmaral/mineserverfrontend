import React, { useState, useEffect } from "react";
import { getLogFiles, LogFilesType } from "./requests/getLogFiles";
import { StatusType, getStatus } from "./requests/getStatus";
import { startServer } from "./requests/startServer";
import { stopServer } from "./requests/stopServer";
import Login from "./Login";
import { UserData } from "./requests/login";
import { cleanLocalUser, cleanLogFileName, loadLocalUser } from "./functions";

import TopBar from "./Components/TopBar";
import ServerLog from "./Components/ServerLog";
import OldLogs from "./Components/OldLogs";
import { updateAutoRestart } from "./requests/updateAutoRestart";
import useLogs from "./Components/useLogs";

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

function App() {
  const [status, setStatus] = useState<StatusType | undefined>();
  const [logFiles, setLogFiles] = useState<LogFilesType | undefined>();
  const [userData] = useState<UserData | null>(loadUserInfo());
  const [loading, setLoading] = useState(false);
  const logs = useLogs();
  const onlineSince = status?.currentLog
    ? new Date(status.currentLog.split("-log.txt")[0])
    : new Date();

  useEffect(() => {
    if (userData) {
      setLoading(true);
      Promise.all([
        getLogFiles().then((r) => setLogFiles(r)),
        getStatus().then((r) => setStatus(r)),
      ]).finally(() => setLoading(false));
    }
  }, [userData]);

  const handleStartServer = () => {
    return startServer().then(() => {
      getLogFiles().then((r) => setLogFiles(r));
      getStatus().then((r) => setStatus(r));
    });
  };

  const handleStopServer = () => {
    return stopServer().then(() =>
      Promise.all([
        getLogFiles().then((r) => setLogFiles(r)),
        getStatus().then((r) => setStatus(r)),
      ])
    );
  };
  const handleToggleAutorestartCallback = () => {
    updateAutoRestart().then(() =>
      Promise.all([
        getLogFiles().then((r) => setLogFiles(r)),
        getStatus().then((r) => setStatus(r)),
      ])
    );
  };

  return userData ? (
    <div>
      <TopBar
        running={status?.running}
        restarting={status?.restarting}
        restartTimeout={status?.restartTimeout}
        autoRestart={status?.autoRestart}
        onlineSince={onlineSince}
        loading={loading}
        onSwitchAutoRestart={handleToggleAutorestartCallback}
        onSwitchPower={status?.running ? handleStopServer : handleStartServer}
      />
      <ServerLog onlineSince={onlineSince} logs={logs} />
      <OldLogs
        logs={
          logFiles?.files.map((logName) => ({
            name: cleanLogFileName(logName),
            url: process.env.REACT_APP_API_URL + logName,
          })) || []
        }
      />
    </div>
  ) : (
    <Login />
  );
}

export default App;

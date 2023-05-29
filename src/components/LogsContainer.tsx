import React from "react";
import { Typography } from "@mui/material";
import { LogFilesType } from "../requests/getLogFiles";
import { cleanLogFileName } from "../functions";

const LogsContainer = ({ logs }: { logs?: LogFilesType }) => {
  if (!logs) return null;
  return (
    <div style={{ borderStyle: "double" }}>
      <Typography>All Log files</Typography>
      <br />
      {logs?.files.map((log: string, i) => (
        <>
          <a
            href={process.env.REACT_APP_API_URL + log}
            target="_blank"
            rel="noreferrer"
          >
            {new Date(cleanLogFileName(log)).toLocaleString()}
          </a>
          <br />
        </>
      ))}
    </div>
  );
};

export default LogsContainer;

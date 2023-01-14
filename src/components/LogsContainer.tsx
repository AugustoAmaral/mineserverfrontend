import { Typography } from "@mui/material";
import React from "react";
import { LogFilesType } from "../requests/getLogFiles";

const LogsContainer = ({ logs }: { logs?: LogFilesType }) => {
  if (!logs) return null;
  return (
    <div>
      <Typography>All Log files</Typography>
      {logs?.files.map((log: string, i) => (
        <>
          <a
            href={process.env.REACT_APP_API_URL + log}
            target="_blank"
            rel="noreferrer"
          >
            {log}
          </a>
          <br />
        </>
      ))}
    </div>
  );
};

export default LogsContainer;

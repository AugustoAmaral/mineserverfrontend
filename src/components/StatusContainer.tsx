import React from "react";
import { Typography } from "@mui/material";
import { StatusType } from "../requests/getStatus";
import { cleanLogFileName } from "../functions";

const StatusContainer = ({ status }: { status?: StatusType }) => {
  if (!status) return null;
  const runningLogDate = new Date(cleanLogFileName(status?.currentLog || ""));
  return (
    <div>
      <Typography>
        Server Status:
        <Typography color="deepskyblue">
          <>
            {status.restarting
              ? "Restarting"
              : status.running
              ? "Running"
              : "Closed"}
          </>
        </Typography>
      </Typography>
      <Typography>
        Server auto-restart {status.autoRestart ? "enabled" : "disabled"}.
        {status.autoRestart && (
          <Typography>
            In case of the server close, it will auto-restart in
            <b>{" " + status.restartTimeout}</b> seconds.
          </Typography>
        )}
      </Typography>
      {status.currentLog ? (
        <Typography>
          Server is running since {runningLogDate.toLocaleString()}.{"  "}
          <a
            href={`${process.env.REACT_APP_API_URL}logs/${status.currentLog}`}
            target="_blank"
            rel="noreferrer"
          >
            Open log
          </a>
        </Typography>
      ) : (
        <Typography>There is no actual log.</Typography>
      )}
    </div>
  );
};

export default StatusContainer;

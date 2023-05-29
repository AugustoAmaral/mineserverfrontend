import React from "react";
import { Typography } from "@mui/material";
import { StatusType } from "../requests/getStatus";
import { cleanLogFileName } from "../functions";

const StatusContainer = ({ status }: { status?: StatusType }) => {
  if (!status) return null;
  const runningLogDate = new Date(
    cleanLogFileName(status.currentLog ? `logs/${status.currentLog}` : "")
  );
  console.log(status?.currentLog);
  return (
    <div>
      <Typography>
        Server Status (Running, Closed or Restarting) :
        <Typography color="deepskyblue">
          <b>
            {status.restarting
              ? "Restarting"
              : status.running
              ? "Running"
              : "Closed"}
          </b>
        </Typography>
      </Typography>
      <br />
      <Typography>
        Server auto-restart {status.autoRestart ? "enabled" : "disabled"}.
        {status.autoRestart && (
          <Typography>
            In case of the server close, it will auto-restart in
            <b>{" " + status.restartTimeout}</b> seconds.
          </Typography>
        )}
      </Typography>
      <br />
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

import { Typography } from "@mui/material";
import React from "react";
import { StatusType } from "../requests/getStatus";

const StatusContainer = ({ status }: { status?: StatusType }) => {
  if (!status) return null;
  console.log(status);
  return (
    <div>
      <Typography>
        O servidor está reiniciando?
        <Typography color="deepskyblue">
          <>{status.restarting ? "Sim" : "Não"}</>
        </Typography>
      </Typography>
      <Typography>
        Estado do servidor atualmente:
        <Typography color="deepskyblue">
          <>{status.status}</>
        </Typography>
      </Typography>
      <Typography>
        Caso o servidor esteja configurado para reiniciar caso crashe, ele
        reiniciará após quantos segundos?
        <Typography color="deepskyblue">
          <>{status.restartTimeout}</>
        </Typography>
      </Typography>
      {status.currentLog ? (
        <Typography>
          {`O nome (e link) do log atual (${status.currentLog})`}
          <a
            href={process.env.REACT_APP_API_URL + status.currentLog}
            target="_blank"
            rel="noreferrer"
          >
            {status.currentLog}
          </a>
        </Typography>
      ) : (
        <Typography>O servidor não tem log do estado atual</Typography>
      )}
    </div>
  );
};

export default StatusContainer;

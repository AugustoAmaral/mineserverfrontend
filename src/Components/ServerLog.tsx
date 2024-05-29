import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LogViewer from "./LogViewer";
import CommandInput from "./CommandInput";
import useLogs from "./useLogs";
import { sendCommand } from "../requests/sendCommand";

type ServerLogProps = {
  onlineSince: Date;
};
export default function ServerLog({ onlineSince }: ServerLogProps) {
  const logEndRef = React.useRef<HTMLDivElement | null>(null);
  const logs = useLogs();

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, []);

  return (
    <Card sx={{ mt: 2, minWidth: 275 }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          zIndex: 1,
        }}
      >
        <Typography sx={{ m: 2 }} variant="h5" component="div" align="left">
          Log do servidor
        </Typography>
      </Box>
      <CardContent
        sx={{ maxHeight: "300px", overflowY: "scroll", textAlign: "left" }}
      >
        <LogViewer log={logs.join("\n")} startDate={onlineSince} />
        <div ref={logEndRef} />
      </CardContent>
      <CardActions>
        <CommandInput onSendCommand={sendCommand} />
      </CardActions>
    </Card>
  );
}

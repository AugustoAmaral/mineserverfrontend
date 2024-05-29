import Typography from "@mui/material/Typography";

interface LogProps {
  log: string;
  startDate?: Date;
}

const LogViewer = ({ log, startDate }: LogProps) => {
  let currentDate = new Date(startDate || new Date());

  return (
    <>
      {log.split("\n").map((line, index) => {
        const parts = line.match(
          /\[(\d{2}:\d{2}:\d{2})\] \[([\w ]+)\/(\w+)\] \[([\w]+)\]: (.+)/
        );
        if (parts) {
          const [_, time, threadType, messageType, modName, message] = parts;
          const timeParts = time.split(":").map((x) => parseInt(x));
          const newDate = new Date(currentDate);
          newDate.setHours(timeParts[0], timeParts[1], timeParts[2]);

          // Check if time has wrapped around to the next day
          if (index > 0 && newDate < currentDate) {
            newDate.setDate(newDate.getDate() + 1);
          }
          currentDate = newDate;

          const messageColor =
            messageType === "WARN"
              ? "warning"
              : messageType === "ERROR"
              ? "error"
              : messageType === "INFO"
              ? "primary"
              : "inherit";

          return (
            <Typography key={index} color={messageColor}>
              {"[" + newDate.toLocaleString() + "] "}
              {"[" + threadType + "/" + messageType + "] "}
              {modName && (
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {"[" + modName + "] "}
                </span>
              )}
              {message}
            </Typography>
          );
        }
        return <Typography key={index}>{line}</Typography>;
      })}
    </>
  );
};

export default LogViewer;

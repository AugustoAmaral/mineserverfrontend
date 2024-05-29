import useWebSocket from "react-use-websocket";
import { useState } from "react";

const useLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const { lastMessage } = useWebSocket(
    process.env.REACT_APP_API_URL?.replace("https", "ws") || "",
    {
      onOpen: () => console.log(`Connected to App WS`),
      onMessage: () => {
        if (lastMessage) {
          setLogs((prevLogs) => [
            ...prevLogs,
            lastMessage.toString() as unknown as string,
          ]);
        }
      },
      onError: (event) => {
        console.error(event);
      },
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3 * 1000,
    }
  );

  return logs;
};

export default useLogs;

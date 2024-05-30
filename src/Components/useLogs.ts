import { useState, useEffect, useRef, useCallback } from "react";

const useLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      wsRef.current = new WebSocket(
        process.env.REACT_APP_API_URL?.replace("https", "ws") || ""
      );

      wsRef.current.onopen = () => {
        console.log("WebSocket connected");
      };

      wsRef.current.onmessage = (event) => {
        setLogs((prevLogs) => [...prevLogs, event.data]);
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      wsRef.current.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        if (event.code !== 1000) {
          setTimeout(connectWebSocket, 3000);
        }
      };
    }
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, "Client closed connection");
      }
    };
  }, [connectWebSocket]);

  return logs;
};

export default useLogs;

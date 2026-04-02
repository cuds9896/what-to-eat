import { createContext, useContext, useEffect, useState } from "react";
import useWebSocketImport from "react-use-websocket";

const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const useWebSocket = useWebSocketImport as any;
  const socketState = useWebSocket.default(
    import.meta.env.VITE_WS_URL,
    {
      share: true,
    },
  );
  return (
    <SocketContext.Provider value={socketState}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket() {
  return useContext(SocketContext);
}

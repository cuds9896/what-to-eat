import { createContext, useContext, useEffect } from "react";
import useWebSocketImport from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../store/user";
import type { WebSocketPayload } from "../types/webSocket/usersPayload";
import type { StoreInterfaces } from "../types/store/StoreInterfaces";
import type { User, UsersStore } from "../types/store/UserStore";

const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const useWebSocket = useWebSocketImport as any;
  const socketState = useWebSocket.default(import.meta.env.VITE_WS_URL, {
    share: true,
  });
  const dispatch = useDispatch();

  const users: UsersStore["usersList"] = useSelector(
    (state: StoreInterfaces) => state.user.usersList,
  );

  const handleSocketData = (data: any) => {
    console.log("Handling socket data:", data);
    if (data.type === "welcome") {
      console.log("Received welcome message:", data.message.uuid);
    } else if (data.type === "users") {
      console.log("Received users list:", data.message.users);
      processUsers(data.message.users);
    } else {
      console.warn("Unknown message type:", data.type);
    }
  };

  const processUsers = (users: WebSocketPayload) => {
    console.log("Processing users data:", users);
    const mappedUsers: User[] = Object.entries(users).map(([uuid, user]) => ({
      uuid,
      username: user.state.username,
      recipes: user.state.recipes,
      votes: user.state.votes,
    }));
    console.log("Mapped users:", mappedUsers);
    dispatch(setUsers({ usersList: mappedUsers }));
    return mappedUsers;
  };

  useEffect(() => {
    console.log("current users in store:", users);
  }, [users]);

  useEffect(() => {
    console.log("Websocket message received:", socketState.lastMessage);
    if (!socketState.lastMessage) {
      console.log("No message received yet.");
      return;
    }
    const data = JSON.parse(socketState.lastMessage.data);
    handleSocketData(data);
  }, [socketState.lastMessage]);

  return (
    <SocketContext.Provider value={socketState}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket() {
  return useContext(SocketContext);
}

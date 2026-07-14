import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../store/user";
import type { WebSocketPayload } from "../types/webSocket/usersPayload";
import type { StoreInterfaces } from "../types/store/StoreInterfaces";
import type { User, UsersStore } from "../types/store/UserStore";
import { setVotingHostId, setVotingOpen } from "../store/page";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { SplitButtons } from "../components/SplitButtons";
import useWebSocketImport from "react-use-websocket";

const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useWebSocket = useWebSocketImport as any;
  const socketUrl = import.meta.env.VITE_WS_URL || "";
  const socketQuery = "?uuid=" + "&username=";
  const socketState = useWebSocket.default(socketUrl + "/path" + socketQuery, {
    share: true,
    shouldReconnect: () => false,
  });

  const users: UsersStore["usersList"] = useSelector(
    (state: StoreInterfaces) => state.user.usersList,
  );

  const handleSocketData = (data: any) => {
    console.log("Handling socket data:", data);
    switch (data.type) {
      case "update":
        console.log("Received update list:", data.message.users);
        processUsers(data.message.users);
        break;
      case "startVoting":
        console.log("Voting session started:", data.message);
        if (data.message.hostId !== localStorage.getItem("uuid")) {
          toast(SplitButtons, {
            position: "top-center",
            autoClose: false,
            onClose: (reason) => {
              if (reason === "join") {
                navigate("/vote");
              }
            },
            data: {
              hostName:
                users.find((user) => user.uuid === data.message.hostId)
                  ?.username || "Unknown",
            },
          });
        }
        dispatch(setVotingOpen(true));
        dispatch(setVotingHostId(data.message.hostId));
        break;
      default:
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
    try {
      const data = JSON.parse(socketState.lastMessage.data);
      handleSocketData(data);
    } catch (error) {
      console.error("Failed to parse websocket message", error);
    }
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

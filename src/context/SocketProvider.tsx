import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../store/user";
import type { StoreInterfaces } from "../types/store/StoreInterfaces";
import type { User, UsersStore } from "../types/store/UserStore";
import { setVotingHostId, setVotingOpen } from "../store/page";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { SplitButtons } from "../components/SplitButtons";
import useWebSocketImport from "react-use-websocket";
import type { WebSocketMessage } from "../types/webSocket/webSocketMessage";

const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useWebSocket = useWebSocketImport as any;
  const socketUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8000";
  const socketState = useWebSocket.default(socketUrl, {
    share: true,
    shouldReconnect: () => false,
  });
  const pendingMessagesRef = useRef<unknown[]>([]);

  const users: UsersStore = useSelector((state: StoreInterfaces) => state.user);

  const handleSocketData = (data: any) => {
    switch (data.type) {
      case "userUpdate":
        const parsedUsers = parseActiveUsers(data.message);
        dispatch(setUsers(parsedUsers));
        break;
      case "startVoting":
        if (data.message.hostId !== users.currentUser) {
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
                users.usersList.find(
                  (user) => user.uuid === data.message.hostId,
                )?.username || "Unknown",
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

  const parseActiveUsers = (activeUsersArray: [string, User][]) => {
    const activeUsersList: User[] = activeUsersArray.map(
      ([uuid, activeUser]) => {
        return {
          uuid: uuid,
          username: activeUser.username,
          recipes: [],
          votes: [],
        };
      },
    );
    return activeUsersList;
  };

  const processVoting = (hostId: string) => {
    if (hostId !== users.currentUser.uuid) {
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
            users.usersList.find((user) => user.uuid === hostId)?.username ||
            "Unknown",
        },
      });
    }
    dispatch(setVotingOpen(true));
    dispatch(setVotingHostId(hostId));
  };

  const sendJsonMessage = useCallback(
    (payload: unknown) => {
      if (socketState.readyState === 1 && socketState.sendJsonMessage) {
        socketState.sendJsonMessage(payload);
        return true;
      }

      pendingMessagesRef.current.push(payload);
      return false;
    },
    [socketState.readyState, socketState.sendJsonMessage],
  );

  useEffect(() => {
    const lastMessage = socketState.lastMessage;
    if (!lastMessage) {
      return;
    }

    let data: WebSocketMessage;
    try {
      data = JSON.parse(lastMessage.data);
      handleSocketData(data);
    } catch (error) {
      console.error("Failed to parse websocket message", error);
    }
  }, [socketState.lastMessage]);

  useEffect(() => {
    if (socketState && users.currentUser.uuid) {
      socketState.sendJsonMessage({ updateUser: users.currentUser });
    }
  }, [users.currentUser]);

  useEffect(() => {
    while (pendingMessagesRef.current.length > 0) {
      const pendingPayload = pendingMessagesRef.current.shift();
      if (pendingPayload !== undefined) {
        socketState.sendJsonMessage(pendingPayload);
      }
    }
  }, [socketState.readyState, socketState.sendJsonMessage]);

  return (
    <SocketContext.Provider value={{ ...socketState, sendJsonMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket() {
  return useContext(SocketContext);
}

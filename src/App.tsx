import { useSelector } from "react-redux";
import { Header } from "./components/Header";
import { LoginPopup } from "./components/LoginPopup";
import Home from "./Home";
import type { UsersStore } from "./types/store/UserStore";
import type { StoreInterfaces } from "./types/store/StoreInterfaces";
import UserStatusBar from "./components/userStatusBar";
import { useEffect } from "react";
import useWebSocketImport from "react-use-websocket";

function App() {
  const users: UsersStore = useSelector((state: StoreInterfaces) => state.user);
  useEffect(() => {
    const useWebSocket = useWebSocketImport as any;
    const { sendJsonMessage } = useWebSocket.default(process.env.VITE_WS_URL, {
      share: true,
      queryParams: { username: "Jack" },
    });
  }, [users]);
  return (
    <>
      <Header />
      {(!users || users.usersList[0].username === "") && <LoginPopup />}
      <Home />
      {users && <UserStatusBar users={users} />}
    </>
  );
}

export default App;

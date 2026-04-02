import { useSelector } from "react-redux";
import { Header } from "./components/Header";
import { LoginPopup } from "./components/LoginPopup";
import type { UsersStore } from "./types/store/UserStore";
import type { StoreInterfaces } from "./types/store/StoreInterfaces";
import UserStatusBar from "./components/userStatusBar";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages";

function App() {
  const users: UsersStore = useSelector((state: StoreInterfaces) => state.user);
  return (
    <>
      <Header />
      {(!users || users.usersList[0].username === "") && <LoginPopup />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<div>Recipes Page</div>} />
          <Route path="/ingredients" element={<div>Ingredients Page</div>} />
        </Routes>
      </BrowserRouter>
      {users && <UserStatusBar users={users} />}
    </>
  );
}

export default App;

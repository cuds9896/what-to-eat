import { useSelector } from "react-redux";
import { Header } from "./components/Header";
import { LoginPopup } from "./components/LoginPopup";
import type { UsersStore } from "./types/store/UserStore";
import type { StoreInterfaces } from "./types/store/StoreInterfaces";
import UserStatusBar from "./components/userStatusBar";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home, Ingredients, Recipes } from "./pages";

function App() {
  const users: UsersStore = useSelector((state: StoreInterfaces) => state.user);
  return (
    <BrowserRouter>
      <Header />
      {(!users || users.usersList[0].username === "") && <LoginPopup />}
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/ingredients" element={<Ingredients />} />
        </Routes>
      </div>
      {users && <UserStatusBar users={users} />}
    </BrowserRouter>
  );
}

export default App;

import { Outlet, Scripts, ScrollRestoration } from "react-router";
import { SocketProvider } from "./context/SocketProvider.tsx";
import store from "./store/index.ts";
import { Provider, useSelector } from "react-redux";
import { Header } from "./components/Header.tsx";
import { LoginPopup } from "./components/LoginPopup.tsx";
import { ToastContainer } from "react-toastify";
import UserStatusBar from "./components/userStatusBar.tsx";
import type { StoreInterfaces } from "./types/store/StoreInterfaces.ts";
import type { UsersStore } from "./types/store/UserStore.ts";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>what-to-eat-test</title>
      </head>
      <body>
        <Provider store={store}>
          <SocketProvider>{children}</SocketProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const users: UsersStore = useSelector((state: StoreInterfaces) => state.user);

  return (
    <div className="App">
      <Header />
      {localStorage.getItem("username") ? null : <LoginPopup />}
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="mt-16">
        <Outlet />
      </div>
      {users && <UserStatusBar users={users} />}
    </div>
  );
}

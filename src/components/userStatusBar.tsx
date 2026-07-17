import { useEffect } from "react";
import type { UsersStore } from "../types/store/UserStore";

const userStatusBar = ({ users }: { users: UsersStore | undefined }) => {
  const username = users?.currentUser.username;
  const userCount = users && users.usersList ? users.usersList.length : 0;

  useEffect(() => {}, [userCount]);

  return (
    <div className="w-full h-12 bg-gray-200 flex items-center justify-end px-4 fixed bottom-0">
      {!username || username === "" ? (
        <span className="text-sm text-gray-600">Not logged in</span>
      ) : (
        <span className="text-sm text-gray-600">
          Logged in as {username} | {userCount} user(s) online
        </span>
      )}
    </div>
  );
};

export default userStatusBar;

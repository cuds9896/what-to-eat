import type { UsersStore } from "../types/store/UserStore";

const userStatusBar = ({ users }: { users: UsersStore | undefined }) => {
  const username = "";
  return (
    <div className="w-full h-12 bg-gray-200 flex items-center justify-end px-4 fixed bottom-0">
      {!username || username === "" ? (
        <span className="text-sm text-gray-600">Not logged in</span>
      ) : (
        <span className="text-sm text-gray-600">
          Logged in as {username} | {users?.usersList.length} user(s) online
        </span>
      )}
    </div>
  );
};

export default userStatusBar;

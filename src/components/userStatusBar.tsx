import type { UsersStore } from "../types/store/UserStore";

const userStatusBar = ({ users }: { users: UsersStore | undefined }) => {
  return (
    <div className="w-full h-12 bg-gray-200 flex items-center justify-end px-4">
      {!users || users.usersList[0].username === "" ? (
        <span className="text-sm text-gray-600">Not logged in</span>
      ) : (
        <span className="text-sm text-gray-600">
          Logged in as {users.usersList[0].username}
        </span>
      )}
    </div>
  );
};

export default userStatusBar;

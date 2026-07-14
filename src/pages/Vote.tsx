import type { StoreInterfaces } from "../types/store/StoreInterfaces";
import { useSelector } from "react-redux";
import type { PageStore } from "../types/store/PageStore";
import { useSocket } from "../context/SocketProvider";
//import { useState } from "react";

export default function Vote() {
  const socket = useSocket();
  const pageData: PageStore["pageData"] = useSelector(
    (state: StoreInterfaces) => state.page.pageData,
  );
  const users = useSelector((state: StoreInterfaces) => state.user.usersList);

  const initiateVotingSession = () => {
    socket.sendJsonMessage({ startVoting: true });
  };

  //const [votingFinished, setVotingFinished] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">It's Voting Time!</h1>
      <h2>
        Today's host:{" "}
        {users.find((user) => user.uuid === pageData.votingHost)?.username ||
          "Unknown"}
      </h2>
      {!pageData.votingOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 z-10">
            <h2 className="text-2xl font-bold mb-6">Start Voting?</h2>
            <p className="mb-6">
              Are you ready to start voting? You will become the host for this
              voting session.
            </p>
            <button
              onClick={() => {
                initiateVotingSession();
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Start Voting
            </button>
          </div>
          <div className="bg-black opacity-50 absolute inset-0"></div>
        </div>
      )}
    </div>
  );
}

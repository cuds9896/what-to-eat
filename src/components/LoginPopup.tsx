import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export const LoginPopup: React.FC = () => {
  const [name, setName] = useState("");
  const socket = useSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.sendJsonMessage({ username: name });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 z-5">
        <h2 className="text-2xl font-bold mb-6">Enter your name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-black opacity-50 absolute inset-0"></div>
    </div>
  );
};

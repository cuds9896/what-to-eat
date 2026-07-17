import React, { useState } from "react";
import ToggleOptionButton from "./ToggleOptionButton";
import { signup } from "../api/signup";
import { login } from "../api/login";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/user";
import { LoaderCircleIcon } from "lucide-react";

export const LoginPopup: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (selectedOption === 0) {
      signup(name, password)
        .then((response) => {
          if (response) {
            dispatch(
              setCurrentUser({
                uuid: response.user.uuid,
                username: response.user.username,
                recipes: [],
                votes: [],
              }),
            );
          } else {
            console.error("Signup failed");
          }
        })
        .catch((error) => {
          console.error("Error during signup:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      login(name, password)
        .then((response) => {
          if (response && response.user.username) {
            dispatch(
              setCurrentUser({
                uuid: response.user.uuid,
                username: response.user.username,
                recipes: [],
                votes: [],
              }),
            );
          } else {
            console.error("Login failed");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96 z-5 gap-4 flex flex-col">
        <h2 className="text-2xl font-bold">Enter your credentials</h2>
        <ToggleOptionButton
          options={["Sign up", "Log in"]}
          bgColour="bg-gray-200"
          activeColour="bg-yellow-200"
          onChange={(selectedOption) => {
            setSelectedOption(selectedOption);
          }}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="flex w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-2 rounded-lg transition justify-center"
            disabled={!name || !password || loading}
          >
            {!loading ? (
              "Submit"
            ) : (
              <LoaderCircleIcon className="animate-spin" />
            )}
          </button>
        </form>
      </div>
      <div className="bg-black opacity-50 absolute inset-0"></div>
    </div>
  );
};

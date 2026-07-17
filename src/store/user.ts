import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UsersStore } from "../types/store/UserStore";

const initialState: UsersStore = {
  currentUser: {
    uuid: "",
    username: "",
    recipes: [],
    votes: [],
  },
  usersList: [
    {
      uuid: "",
      username: "",
      recipes: [],
      votes: [],
    },
  ],
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserStore: (state) => {
      state.usersList = initialState.usersList;
      state.currentUser = initialState.currentUser;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.usersList = [...action.payload];
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { clearUserStore, setUsers, setCurrentUser } = users.actions;

export default users.reducer;

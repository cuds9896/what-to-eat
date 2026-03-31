import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UsersStore } from "../types/store/UserStore";

const initialState: UsersStore = {
  usersList: [
    {
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
    },
    setUsers: (state, action: PayloadAction<UsersStore>) => {
      console.log("Setting users in store:", action.payload);
      state.usersList = action.payload.usersList;
    },
  },
});

export const { clearUserStore, setUsers } = users.actions;

export default users.reducer;

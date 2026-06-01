import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageStore } from "../types/store/PageStore";

const initialState: PageStore = {
  pageData: {
    votingOpen: false,
  },
};

const page = createSlice({
  name: "page",
  initialState,
  reducers: {
    clearPageStore: (state) => {
      state.pageData = initialState.pageData;
    },
    setVotingOpen: (state, action: PayloadAction<boolean>) => {
      state.pageData.votingOpen = action.payload;
    },
  },
});

export const { clearPageStore, setVotingOpen } = page.actions;

export default page.reducer;

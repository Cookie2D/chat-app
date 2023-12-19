import { createSlice } from "@reduxjs/toolkit";import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { UserFromSocket } from "../../types/user.types";

interface ChatState {
  users: UserFromSocket[];
}

const initialState: ChatState = {
  users: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserFromSocket[]>) => {
      state.users = action.payload;
    },
  },
});

export const selectChatUsers = (state: RootState): UserFromSocket[] => state.chat.users;
export const { setUsers } = chatSlice.actions;
export default chatSlice.reducer;

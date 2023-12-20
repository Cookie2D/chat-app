import { createSlice } from "@reduxjs/toolkit";import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { UserFromSocket } from "../../types/user.types";
import { ChatInfo } from "../../types/chat.types";

interface ChatState {
  users: UserFromSocket[];
  chatInfo: ChatInfo;
}

const initialState: ChatState = {
  users: [],
  chatInfo: {
    chatId: null,
    messages: [],
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserFromSocket[]>) => {
      state.users = action.payload;
    },
    setChatInfo: (state, action: PayloadAction<ChatInfo>) => {
      state.chatInfo = action.payload;
    },
  },
});

export const selectChatUsers = (state: RootState): UserFromSocket[] => state.chat.users;
export const selectChatInfo = (state: RootState): ChatInfo => state.chat.chatInfo;
export const { setUsers, setChatInfo } = chatSlice.actions;
export default chatSlice.reducer;

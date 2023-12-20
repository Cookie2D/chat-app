import { createSlice } from "@reduxjs/toolkit";import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { UserFromSocket } from "../../types/user.types";
import { ChatInfo, Message } from "../../types/chat.types";

interface ChatState {
  users: UserFromSocket[];
  chatInfo: ChatInfo;
}

const initialState: ChatState = {
  users: [],
  chatInfo: {
    chatId: null,
    messages: [],
    users: [],
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
    appendNewMessage: (state, action: PayloadAction<Message>) => {
      state.chatInfo.messages = [...state.chatInfo.messages, action.payload];
    },
  },
});

export const selectChatUsers = (state: RootState): UserFromSocket[] => state.chat.users;
export const selectChatInfo = (state: RootState): ChatInfo => state.chat.chatInfo;
export const { setUsers, setChatInfo, appendNewMessage } = chatSlice.actions;
export default chatSlice.reducer;

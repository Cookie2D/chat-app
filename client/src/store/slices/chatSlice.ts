import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { User } from "../../types/user.types";
import { ChatInfo, Message } from "../../types/chat.types";

interface ChatState {
  users: User[];
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
    setUsers: (state, action: PayloadAction<User[]>) => {
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

export const selectChatUsers = (state: RootState): User[] => state.chat.users;
export const selectChatInfo = (state: RootState): ChatInfo => state.chat.chatInfo;
export const { setUsers, setChatInfo, appendNewMessage } = chatSlice.actions;
export default chatSlice.reducer;

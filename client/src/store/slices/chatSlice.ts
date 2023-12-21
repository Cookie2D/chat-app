import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { User } from "../../types/user.types";
import { ChatInfo, Message } from "../../types/chat.types";

interface ChatState {
  onlineUsers: User[];
  users: User[];
  chatInfo: ChatInfo;
}

const initialState: ChatState = {
  onlineUsers: [],
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
    setOnlineUsers: (state, action: PayloadAction<User[]>) => {
      state.onlineUsers = action.payload;
    },
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

export const selectUsers = (state: RootState): User[] => state.chat.users;
export const selectOnlineUsers = (state: RootState): User[] => state.chat.onlineUsers;
export const selectChatInfo = (state: RootState): ChatInfo => state.chat.chatInfo;
export const { setOnlineUsers, setUsers, setChatInfo, appendNewMessage } = chatSlice.actions;
export default chatSlice.reducer;

import { io, Socket } from "socket.io-client";
import { selectAuth } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user.types";
import { appendNewMessage, setChatInfo, setUsers } from "../store/slices/chatSlice";
import { ChatInfo, Message } from "../types/chat.types";
import { SendMessageParams } from "../types/chat-functions.interface";

const useSocket = () => {
  const user = useAppSelector(selectAuth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleConnect = () => {
    if (!socket && user.token) {
      const newSocket = io(import.meta.env.VITE_SOCKET_BASE_PATH, {
        query: { token: user.token },
      });
      setSocket(newSocket);
    }
  };

  const getChatInfo = (res: ChatInfo) => {
    dispatch(setChatInfo(res));
  };

  const getOnlineUsers = (res: User[]) => {
    dispatch(setUsers(res));
  };

  const handleLogout = () => {
    socket?.disconnect();
    localStorage.removeItem("user");
    navigate("/autentication");
  };

  const sendMessage = (message: SendMessageParams) => {
    socket?.emit("sendMessage", message);
  };

  const addNewMessageToChat = (message: Message) => {
    dispatch(appendNewMessage(message));
  };

  const uploadChatInfo = () => {
    if (socket) {
      socket.on("getChatInfo", getChatInfo);
      socket.on("getOnlineUsers", getOnlineUsers);
      socket.on("disconnect", handleLogout);
      socket.on("newMessage", addNewMessageToChat);
    }
  };

  useEffect(() => {
    handleConnect();
    uploadChatInfo();

    return () => {
      socket?.disconnect();
    };
  }, [socket, user.token]);

  return {
    handleLogout,
    sendMessage,
  };
};

export default useSocket;

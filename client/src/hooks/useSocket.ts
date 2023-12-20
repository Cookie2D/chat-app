import { io, Socket } from "socket.io-client";
import { selectAuth } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserFromSocket } from "../types/user.types";
import { setChatInfo, setUsers } from "../store/slices/chatSlice";
import { ChatInfo } from "../types/chat.types";

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

  const getOnlineUsers = (res: UserFromSocket[]) => {
    dispatch(setUsers(res));
  };

  const handleLogout = () => {
    socket?.disconnect();
    localStorage.removeItem("user");
    navigate("/");
  };

  const uploadChatInfo = () => {
    if (socket) {
      socket.on("getChatInfo", getChatInfo);
      socket.on("getOnlineUsers", getOnlineUsers);
      socket.on("disconnect", handleLogout);
    }
  };

  useEffect(() => {
    handleConnect();
    uploadChatInfo();

    return () => {
      socket?.off("getOnlineUsers", uploadChatInfo);
      socket?.off("disconnect", handleLogout);
    };
  }, [socket, user.token]);

  return {
    handleLogout,
  };
};

export default useSocket;

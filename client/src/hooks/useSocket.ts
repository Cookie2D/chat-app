import { io, Socket } from "socket.io-client";import { selectAuth } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserFromSocket } from "../types/user.types";
import { setUsers } from "../store/slices/chatSlice";

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

  const getOnlineUsers = (res: UserFromSocket[]) => {
    dispatch(setUsers(res));
  };

  const handleLogout = () => {
    socket?.disconnect();
    localStorage.removeItem("user");
    navigate("/");
  };

  const uploadUsers = () => {
    if (socket) {
      socket.emit("addNewUser", user.token);
      socket.on("getOnlineUsers", getOnlineUsers);
      socket.on("disconnect", handleLogout);
    }
  };

  useEffect(() => {
    handleConnect();
    uploadUsers();

    return () => {
      socket?.off("getOnlineUsers", getOnlineUsers);
      socket?.off("disconnect", handleLogout);
    };
  }, [socket, user.token]);

  return {
    handleLogout,
  };
};

export default useSocket;

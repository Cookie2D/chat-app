import {
  InputBase,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlice";
import { Socket, io } from "socket.io-client";
import { socket as defaultSocket } from "../../socket/socket";

interface User {
  id: number;
  name: string;
}

interface OnlineUsers {
  user: User;
  socketId: string;
}

export default function UserList() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket>(defaultSocket);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[]>([]);
  const user = useAppSelector(selectAuth);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_BASE_PATH, {
      query: { token: user.token },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const handleOnlineUsers = (res: OnlineUsers[]) => {
      console.log(res);
      setOnlineUsers(res);
    };

    const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/");
    };

    if (socket) {
      socket.emit("addNewUser", user.token);
      socket.on("getOnlineUsers", handleOnlineUsers);
      socket.on("disconnect", handleLogout);

      return () => {
        socket.off("getOnlineUsers", handleOnlineUsers);
        socket.off("disconnect", handleLogout);
      };
    }
  }, [socket, user, navigate]);

  return (
    <div style={{ width: "30%", marginRight: "20px" }}>
      <h3>Users</h3>
      <div style={{ marginBottom: "10px" }}>
        <InputBase
          placeholder="Search users..."
          startAdornment={
            <InputAdornment position="start">
              <IconButton size="small">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <List>
        {onlineUsers.map((userData) => (
          <ListItem button key={userData.user.id}>
            <ListItemAvatar>
              <Avatar alt="User 1" src="/path/to/avatar1.jpg" />
            </ListItemAvatar>
            <ListItemText primary={userData.user.name} secondary="Online" />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

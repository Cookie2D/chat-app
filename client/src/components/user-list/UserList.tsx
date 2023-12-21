import React from "react";
import { InputBase, InputAdornment, IconButton, List } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks";
import { selectOnlineUsers, selectUsers } from "../../store/slices/chatSlice";
import { selectAuth } from "../../store/slices/authSlice";
import UserListItem from "./UserListItem";

interface UserListProps {
  muteUser: (userId: number) => void;
  banUser: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ muteUser, banUser }) => {
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const users = useAppSelector(selectUsers);
  const authUser = useAppSelector(selectAuth);

  const offlineUsers = users.filter(
    (user) => authUser.role === 1 && !onlineUsers.find((onlineUser) => onlineUser.id === user.id)
  );

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
        {onlineUsers.map((user) => (
          <UserListItem
            key={user.id}
            muteUser={muteUser}
            banUser={banUser}
            user={user}
            status="Online"
          />
        ))}

        {authUser.role === 1 &&
          offlineUsers.map((user) => (
            <UserListItem
              key={user.id}
              muteUser={muteUser}
              banUser={banUser}
              user={user}
              status="Offline"
            />
          ))}
      </List>
    </div>
  );
};

export default UserList;

import React, { useState } from "react";
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

  const [searchQuery, setSearchQuery] = useState("");

  const filteredOnlineUsers = onlineUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOfflineUsers = offlineUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        width: "30%",
        marginRight: "20px",
        maxHeight: "75vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <h3>Users</h3>
      <div style={{ marginBottom: "10px" }}>
        <InputBase
          placeholder="Search users..."
          onChange={(e) => setSearchQuery(e.target.value)}
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
        {filteredOnlineUsers.map((user) => (
          <UserListItem
            key={user.id}
            muteUser={muteUser}
            banUser={banUser}
            user={user}
            status="Online"
          />
        ))}

        {authUser.role === 1 &&
          filteredOfflineUsers.map((user) => (
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

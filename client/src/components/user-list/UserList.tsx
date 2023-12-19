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

import { Search } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks";
import { selectChatUsers } from "../../store/slices/chatSlice";

export default function UserList() {
  const chatUsers = useAppSelector(selectChatUsers);

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
        {chatUsers.map((userData) => (
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

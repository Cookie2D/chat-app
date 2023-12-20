import {
  InputBase,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { BlockOutlined, Search, VolumeOffSharp, VolumeUpSharp } from "@mui/icons-material";
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
          <ListItem key={userData.user.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: userData.user.color }}>
                {userData.user.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ color: userData.user.color }}>{userData.user.name}</Typography>
              }
              secondary={
                <Typography sx={{ color: userData.status === "Online" ? "green" : "red" }}>
                  {userData.status}
                </Typography>
              }
            />
            <IconButton color="primary">
              <VolumeUpSharp />
              <VolumeOffSharp />
            </IconButton>

            <IconButton>
              <BlockOutlined />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

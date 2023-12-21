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
import { selectOnlineUsers, selectUsers } from "../../store/slices/chatSlice";

export default function UserList() {
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const users = useAppSelector(selectUsers);

  const offlineUsers = users.filter(
    (user) => !onlineUsers.find((onlineUser) => onlineUser.id === user.id)
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
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: user.color }}>{user.name.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography sx={{ color: user.color }}>{user.name}</Typography>}
              secondary={<Typography sx={{ color: "green" }}>Online</Typography>}
            />
            <IconButton>
              <VolumeUpSharp />
            </IconButton>
            <IconButton>
              <BlockOutlined />
            </IconButton>
          </ListItem>
        ))}

        {offlineUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: user.color }}>{user.name.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography sx={{ color: user.color }}>{user.name}</Typography>}
              secondary={<Typography sx={{ color: "red" }}>Offline</Typography>}
            />
            <IconButton>
              <VolumeUpSharp />
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

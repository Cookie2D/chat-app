import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { BlockOutlined, VolumeUpSharp, VolumeOffSharp } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlice";
import { User } from "../../types/user.types";

interface UserListItemProps {
  user: User;
  status: string;
  muteUser: (userId: number) => void;
  banUser: (userId: number) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, status, banUser, muteUser }) => {
  const authUser = useAppSelector(selectAuth);
  const showButtons = authUser.role === 1 && authUser.id !== user.id;

  return (
    <ListItem key={user.id}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: user.color }}>{user.name.charAt(0).toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography sx={{ color: user.color }}>{user.name}</Typography>}
        secondary={
          <Typography sx={{ color: status === "Online" ? "green" : "red" }}>{status}</Typography>
        }
      />
      {showButtons && (
        <>
          <IconButton
            color={user.muted ? "error" : "primary"}
            onClick={() => {
              muteUser(user.id);
            }}
          >
            {user.muted ? <VolumeOffSharp /> : <VolumeUpSharp />}
          </IconButton>
          <IconButton
            color={user.banned ? "error" : "primary"}
            onClick={() => {
              banUser(user.id);
            }}
          >
            <BlockOutlined />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default UserListItem;

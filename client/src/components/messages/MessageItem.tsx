import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Message } from "../../types/chat.types";
import { selectAuth } from "../../store/slices/authSlice";
import { useAppSelector } from "../../store/hooks";

export default function MessageItem({ message }: { message: Message }) {
  const user = useAppSelector(selectAuth);
  const { color, name } = message.user;

  const timestamp = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isOwner = message.userId === user.id;
  return (
    <Box
      key={message.id}
      sx={{
        display: "flex",
        marginBottom: "10px",
        alignItems: "center",
        justifyContent: isOwner ? "flex-end" : undefined,
      }}
    >
      <Avatar sx={{ bgcolor: color }}>{name.charAt(0).toUpperCase()}</Avatar>
      <Box sx={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" color={color}>
          {`${name} `}
          <Typography component="span" color="textSecondary">
            • {timestamp}
          </Typography>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {message.message}
        </Typography>
      </Box>
    </Box>
  );
}

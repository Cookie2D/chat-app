import { Avatar, Box, Paper, Typography } from "@mui/material";import ChatInput from "../chat-input/ChatInput";
import { useAppSelector } from "../../store/hooks";
import { selectChatInfo } from "../../store/slices/chatSlice";
import { Message } from "../../types/chat.types";
import { SendMessageParams } from "../../types/chat-functions.interface";

interface ChatWindowProps {
  sendMessage: (params: SendMessageParams) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ sendMessage }) => {
  const { messages } = useAppSelector(selectChatInfo);

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5">Chat</Typography>
      </Box>

      <Paper elevation={3} sx={{ minHeight: "400px", padding: "20px", overflowY: "auto" }}>
        {messages.map((message: Message) => {
          const { color, name } = message.user;

          const timestamp = new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <Box
              key={message.id}
              sx={{ display: "flex", marginBottom: "10px", alignItems: "center" }}
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
        })}
      </Paper>
      <ChatInput sendMessage={sendMessage} />
    </Box>
  );
};

export default ChatWindow;

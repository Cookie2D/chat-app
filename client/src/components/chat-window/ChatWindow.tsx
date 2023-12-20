import { Box, Paper, Typography } from "@mui/material";
import ChatInput from "../chat-input/ChatInput";
import { useAppSelector } from "../../store/hooks";
import { selectChatInfo } from "../../store/slices/chatSlice";
import { Message } from "../../types/chat.types";

export default function ChatWindow() {
  const { messages } = useAppSelector(selectChatInfo);

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <Typography variant="h5">Chat</Typography>
      </Box>

      <Paper elevation={3} sx={{ minHeight: "400px", padding: "20px", overflowY: "auto" }}>
        {messages.map((message: Message) => {
          return <Typography variant="body1">{message.message}</Typography>;
        })}
      </Paper>

      <ChatInput />
    </Box>
  );
}

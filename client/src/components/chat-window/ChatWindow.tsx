import { Box, Paper, Typography } from "@mui/material";
import ChatInput from "../chat-input/ChatInput";

export default function ChatWindow() {
  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <Typography variant="h5">Chat</Typography>
      </Box>

      <Paper elevation={3} sx={{ minHeight: "400px", padding: "20px", overflowY: "auto" }}>
        {/* Chat messages will be displayed here */}
        <Typography variant="body1">User 1: Hello!</Typography>
        <Typography variant="body1">User 2: Hi there!</Typography>
      </Paper>

      <ChatInput />
    </Box>
  );
}

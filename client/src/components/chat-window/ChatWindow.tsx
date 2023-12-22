import { Box, Typography } from "@mui/material";
import ChatInput from "../chat-input/ChatInput";
import { SendMessageParams } from "../../types/chat-functions.interface";
import MessageList from "../messages/MessageList";

interface ChatWindowProps {
  sendMessage: (params: SendMessageParams) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ sendMessage }) => {
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

      <MessageList />
      <ChatInput sendMessage={sendMessage} />
    </Box>
  );
};

export default ChatWindow;

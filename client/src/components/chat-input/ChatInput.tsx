import { Send } from "@mui/icons-material";
import { InputBase, InputAdornment, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlice";
import { selectChatInfo } from "../../store/slices/chatSlice";
import { SendMessageParams } from "../../types/chat-functions.interface";

interface ChatInputProps {
  sendMessage: (params: SendMessageParams) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const user = useAppSelector(selectAuth);
  const { chatId } = useAppSelector(selectChatInfo);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    sendMessage({ message, token: user.token, chatId });
    setMessage("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        marginTop: "20px",
        borderRadius: "5px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputBase
        fullWidth
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyPress}
        sx={{ flexGrow: 1 }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleSend}>
              <Send />
            </IconButton>
          </InputAdornment>
        }
      />
    </Paper>
  );
};

export default ChatInput;

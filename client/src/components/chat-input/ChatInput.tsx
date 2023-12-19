import { Send } from "@mui/icons-material";import { InputBase, InputAdornment, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    console.log(message);
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
        multiline
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
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
}

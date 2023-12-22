import { Paper } from "@mui/material";
import MessageItem from "./MessageItem";
import { Message } from "../../types/chat.types";
import { useRef, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectChatInfo } from "../../store/slices/chatSlice";

export default function MessageList() {
  const { messages } = useAppSelector(selectChatInfo);

  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper
      ref={paperRef}
      elevation={3}
      sx={{ minHeight: "400px", padding: "20px", overflowY: "auto", height: "60vh" }}
    >
      {messages.map((message: Message) => (
        <MessageItem message={message} />
      ))}
    </Paper>
  );
}

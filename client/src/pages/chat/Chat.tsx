import Header from "../../components/header/Header";
import ChatWindow from "../../components/chat-window/ChatWindow";
import UserList from "../../components/user-list/UserList";
import { Box } from "@mui/material";

export default function Chat() {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", padding: "20px" }}>
        <UserList />
        <ChatWindow />
      </Box>
    </>
  );
}

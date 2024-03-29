import Header from "../../components/header/Header";
import ChatWindow from "../../components/chat-window/ChatWindow";
import UserList from "../../components/user-list/UserList";
import { Box } from "@mui/material";
import useSocket from "../../hooks/useSocket";

export default function Chat() {
  const { handleLogout, sendMessage, muteUser, banUser } = useSocket();

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Box sx={{ display: "flex", padding: "20px" }}>
        <UserList muteUser={muteUser} banUser={banUser} />
        <ChatWindow sendMessage={sendMessage} />
      </Box>
    </>
  );
}

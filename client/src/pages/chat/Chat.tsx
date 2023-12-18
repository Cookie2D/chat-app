import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  InputBase,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { LogoutOutlined, Search, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // TODO: separate with several components, code cleanup

  return (
    <>
      {/* TODO: separate to header component */}
      <Paper
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <ListItem style={{ flex: 1 }}>
          <ListItemAvatar style={{ marginRight: "16px" }}>
            <Avatar alt="User 2" src="/path/to/avatar2.jpg" />
          </ListItemAvatar>
          <ListItemText primary="User 2" secondary="Offline" />
        </ListItem>
        <Box style={{ marginLeft: "auto" }}>
          <IconButton onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Box>
      </Paper>

      <div style={{ display: "flex", padding: "20px" }}>
        {/* User List */}
        <div style={{ width: "30%", marginRight: "20px" }}>
          <h3>Users</h3>
          <div style={{ marginBottom: "10px" }}>
            <InputBase
              placeholder="Search users..."
              startAdornment={
                <InputAdornment position="start">
                  <IconButton size="small">
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <List>
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt="User 1" src="/path/to/avatar1.jpg" />
              </ListItemAvatar>
              <ListItemText primary="User 1" secondary="Online" />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt="User 2" src="/path/to/avatar2.jpg" />
              </ListItemAvatar>
              <ListItemText primary="User 2" secondary="Offline" />
            </ListItem>
            {/* TODO: Add user from API uploading */}
          </List>
        </div>

        {/* Chat Window */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
            <h2>Chat</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>Username</span>
            </div>
          </div>

          <Paper elevation={3} style={{ minHeight: "400px", padding: "20px", overflowY: "auto" }}>
            {/* Chat messages will be displayed here */}
            <p>User 1: Hello!</p>
            <p>User 2: Hi there!</p>
            {/* Add more chat messages as needed */}
          </Paper>

          {/* Input Menu for Chat */}
          <div
            style={{
              marginTop: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <InputBase
              fullWidth
              multiline
              placeholder="Type your message..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton size="small">
                    <Send />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

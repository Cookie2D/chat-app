import { LogoutOutlined } from "@mui/icons-material";
import {
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlice";
interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  const user = useAppSelector(selectAuth);

  return (
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
          <Avatar sx={{ bgcolor: user.color }}>{user.name?.charAt(0).toUpperCase()}</Avatar>{" "}
        </ListItemAvatar>
        <ListItemText
          primary={<Typography sx={{ color: user.color }}>{user.name}</Typography>}
          secondary="Online"
        />
      </ListItem>
      <Box style={{ marginLeft: "auto" }}>
        <IconButton onClick={handleLogout}>
          <LogoutOutlined />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Header;

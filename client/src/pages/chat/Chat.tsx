import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("user", "");
    navigate("/");
  };

  return (
    <div>
      Chat
      <Button onClick={handleLogout}>Handle logout</Button>
    </div>
  );
}

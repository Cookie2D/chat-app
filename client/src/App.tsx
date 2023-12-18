import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="*" element={<Navigate to="/authentication" />} />
    </Routes>
  );
}

export default App;

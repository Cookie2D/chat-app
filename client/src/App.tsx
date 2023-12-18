import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Chat from "./pages/chat/Chat";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { setUser } from "./store/slices/authSlice";
import PrivateRoute from "./components/private-route/PrivateRoute";

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <Routes>
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="*" element={<Navigate to="/authentication" />} />
    </Routes>
  );
}

export default App;

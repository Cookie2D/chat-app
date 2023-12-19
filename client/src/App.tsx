import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Chat from "./pages/chat/Chat";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { setUser } from "./store/slices/authSlice";
import PrivateRoute from "./components/private-route/PrivateRoute";

const user = JSON.parse(localStorage.getItem("user") || "{}");
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/chat"
        element={
          <PrivateRoute token={user.token}>
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

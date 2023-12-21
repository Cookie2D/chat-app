import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Chat from "./pages/chat/Chat";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { selectAuth, setUser } from "./store/slices/authSlice";
import ProtectedRoute from "./components/private-route/PrivateRoute";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);

  useEffect(() => {
    if (!user.token) {
      const localstorageUser = JSON.parse(localStorage.getItem("user") || "{}");
      dispatch(setUser(localstorageUser));
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route element={<ProtectedRoute token={user.token} redirectPath="authentication" />}>
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route path="/authentication" element={<Authentication />} />
      <Route path="*" element={<Navigate to="/authentication" />} />
    </Routes>
  );
}

export default App;

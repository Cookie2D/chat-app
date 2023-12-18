import { useSelector } from "react-redux";
import { selectAuth } from "../../store/slices/authSlice";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useSelector(selectAuth);
  return token ? children : <Navigate to="/authentication" />;
}

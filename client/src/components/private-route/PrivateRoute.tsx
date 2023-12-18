import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  token,
  children,
}: {
  token: string;
  children: JSX.Element;
}) {
  // const { token } = useSelector(selectAuth);
  return token ? children : <Navigate to="/authentication" />;
}

import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  token,
  redirectPath = "/authentication",
}: {
  token: string | null | boolean;
  redirectPath: string;
}) {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

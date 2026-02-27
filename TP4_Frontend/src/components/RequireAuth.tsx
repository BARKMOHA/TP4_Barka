import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function RequireAuth({ children }: any) {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

//https://fireship.dev/react-router-protected-routes-authentication
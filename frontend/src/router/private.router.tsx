// routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { JSX } from "react";

export function PrivateRoute({ children }: { children: JSX.Element }) {
   const { auth } = useAuthStore();
   return auth.logged ? children : <Navigate to="/auth/login" replace />;
}

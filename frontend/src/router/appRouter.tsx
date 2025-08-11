// AppRouter.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import AuthRouter from "./authRouter";
import { useAuthStore } from "../store/auth.store";
import { useCallback, useEffect } from "react";
import { fetchConToken } from "../helpers/fetch.helper";
import { PublicRoute } from "./public.router";
import { PrivateRoute } from "./private.router";

export default function AppRouter() {
   const { auth, verifyToken } = useAuthStore();

   const verifyTokenCallback = useCallback(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
         verifyToken({ id: null, checking: false, logged: false, email: null });
         return false;
      }

      const data = await fetchConToken("auth/renew", "GET");
      if (data.token) {
         localStorage.setItem("token", data.token);
         verifyToken({
            id: data.user.id,
            checking: false,
            logged: true,
            email: data.user.email
         });
         return true;
      } else {
         verifyToken({ id: null, checking: false, logged: false, email: null });
         return false;
      }
   }, [verifyToken]);

   useEffect(() => {
      verifyTokenCallback();
   }, [verifyTokenCallback]);

   if (auth.checking) {
      return "Espere por favor...";
   }

   return (
      <BrowserRouter>
         <Routes>
            <Route
               path="/auth/*"
               element={
                  <PublicRoute>
                     <AuthRouter />
                  </PublicRoute>
               }
            />

            <Route
               path="/chat"
               element={
                  <PrivateRoute>
                     <ChatPage />
                  </PrivateRoute>
               }
            />

            {/* Redirección raíz */}
            <Route path="/" element={<Navigate to="/chat" replace />} />

            {/* Ruta 404 */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
         </Routes>
      </BrowserRouter>
   );
}

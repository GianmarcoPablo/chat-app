// AppRouter.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import AuthRouter from "./authRouter";
import { useAuthStore } from "../store/auth.store";
import { useCallback, useEffect } from "react";
import { fetchConToken } from "../helpers/fetch.helper";

export default function AppRouter() {

   const { auth, verifyToken } = useAuthStore()

   const verifyTokenCallback = useCallback(async () => {
      const token = localStorage.getItem("token")
      if (!token) {
         verifyToken()
      }

      const resp = await fetchConToken("auth/renew", "GET")
      if (resp.token) {
         localStorage.setItem("token", resp.token)

         return true
      }else{
         // poner todo checking a false logged a false y el resto a null
      }
   }, [])



   useEffect(() => {

   }, [])

   if (auth.checking) {
      return "Espere porfavor"
   }

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />

            {/* Rutas de autenticación */}
            <Route path="auth/*" element={<AuthRouter />} />

            {/* Rutas protegidas */}
            <Route path="chat" element={<ChatPage />} />

            {/* Ruta 404 */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
         </Routes>
      </BrowserRouter>
   );
}

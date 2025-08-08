import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import "../login.css"

export default function AuthRouter() {
   return (
      <Routes>
         <Route path="/" element={<AuthLayout />}>
            {/* Redirige de /auth a /auth/login */}
            <Route index element={<Navigate to="login" replace />} />

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Redirige cualquier otra ruta dentro de /auth a login */}
            <Route path="*" element={<Navigate to="login" replace />} />
         </Route>
      </Routes>
   );
}

export const AuthLayout = () => {
   return (
      <div className="limiter">
         <div className="container-login100">
            <div className="wrap-login100 p-t-50 p-b-90">
               <Outlet />
            </div>
         </div>
      </div>
   )
}

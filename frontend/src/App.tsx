import { useEffect } from "react";
import AppRouter from "./router/appRouter";
import { useAuthStore } from "./store/auth.store";
import { useSocketStore } from "./store/socket.store";
export default function App() {

   const { auth } = useAuthStore()
   const { connectSocket, disconnectSocket } = useSocketStore()

   useEffect(() => {
      if (auth.logged) {
         connectSocket()
      }
   }, [auth, connectSocket])

   useEffect(() => {
      if (!auth.logged) {
         disconnectSocket()
      }
   }, [auth, disconnectSocket])


   return (
      <>
         <AppRouter />
      </>
   );
}

import { useEffect } from "react";
import AppRouter from "./router/appRouter";
import { useAuthStore } from "./store/auth.store";
import { useSocketStore } from "./store/socket.store";
import { useChatStore } from "./store/chat.store";

export default function App() {
   const { auth } = useAuthStore();
   const { connectSocket, disconnectSocket, socket } = useSocketStore();
   const loadUsers = useChatStore().loadUsers
   const newMessage = useChatStore().newMessage

   useEffect(() => {
      if (auth.logged) {
         const token = localStorage.getItem("token") || undefined;
         connectSocket(token);
      } else {
         disconnectSocket();
      }
   }, [auth.logged, connectSocket, disconnectSocket]);

   useEffect(() => {
      socket?.on("lista-usuarios", (usuarios) => {
         loadUsers(usuarios)
      })
   }, [socket])

   useEffect(() => {
      socket?.on("mensaje-personal", (mensaje) => {
         newMessage(mensaje)
      })
   }, [socket])

   return <AppRouter />;
}

import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketState {
   socket: Socket | null;
   online: boolean;
   connectSocket: () => void;
   disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>()((set) => {
   const socketInstance = io("http://localhost:8000", {
      path: "/ws",
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true
   });




   // Limpiar al cerrar la ventana
   window.addEventListener("beforeunload", () => {
      socketInstance.disconnect();
   });


   return {
      socket: socketInstance,
      online: socketInstance.connected,
      connectSocket: () => {
         socketInstance.on("connect", () => set({ online: true }));

      },
      disconnectSocket: () => {
         socketInstance.on("disconnect", () => set({ online: false }));
      }
   };
});

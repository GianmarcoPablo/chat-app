// store/socket.store.ts
import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketState {
   socket: Socket | null;
   online: boolean;
   connectSocket: (token?: string) => void;
   disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
   socket: null,
   online: false,

   connectSocket: (token?: string) => {
      // Evitar múltiples conexiones
      if (get().socket?.connected) return;

      const socketInstance: Socket = io("http://localhost:8000", {
         path: "/ws",
         transports: ["websocket"],
         autoConnect: true,
         forceNew: true,
         query:{
            "x-token": token
         }
      });

      socketInstance.on("connect", () => set({ online: true }));
      socketInstance.on("disconnect", () => set({ online: false }));

      set({ socket: socketInstance });
   },

   disconnectSocket: () => {
      const socket = get().socket;
      if (socket) {
         socket.disconnect();
         set({ socket: null, online: false });
      }
   },
}));

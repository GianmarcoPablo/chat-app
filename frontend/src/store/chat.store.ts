// store/socket.store.ts
import { create } from "zustand";

export interface User {
   email: string
   id: number
   online: boolean
}

export interface Mensaje {
   id: number;
   paraId: number
   deId: number
   mensaje: string
}

interface ChatState {
   uuid: number | null
   activeChat: number | null
   usuarios: User[]
   mensajes: Mensaje[]
   loadUsers: (users: User[]) => void
   setActiveChat: (id: number) => void
   newMessage: (message: any) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
   uuid: null,
   activeChat: null,
   mensajes: [],
   usuarios: [],
   loadUsers: (users: User[]) => {
      set({ usuarios: users })
   },
   setActiveChat: (id: number) => {
      const activeChat = get().activeChat;
      if (activeChat === id) return
      set({ activeChat: id })
   },
   newMessage: (message: any) => {
      const activeChat = get().activeChat;
      const mensajes = get().mensajes
      if (activeChat === message.deId || activeChat === message.paraId) {
         set({ mensajes: [...mensajes, message] })
      } else {
         return mensajes
      }
   }
}));

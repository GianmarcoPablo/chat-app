import { create } from "zustand";
import { fetchSinToken } from "../helpers/fetch.helper";



interface Auth {
   id: number | null
   checking: boolean
   logged: boolean
   email: string | null
}

type Store = {
   auth: Auth
   login: (email: string, password: string) => Promise<boolean>
   register: (email: string, password: string) => Promise<boolean>
   verifyToken: (data: Auth) => Promise<void>
}

export const useAuthStore = create<Store>()((set) => ({
   auth: {
      id: null,
      checking: true,
      logged: false,
      email: ""
   },

   login: async (email, password) => {
      try {
         const data = await fetchSinToken("auth/login", "POST", { email, password });
         if (data.token) {
            localStorage.setItem("token", data.token)
            set({
               auth: {
                  id: data.user.id,
                  checking: false,
                  logged: true,
                  email: data.user.email
               }
            });
            return true
         }
         return false
      } catch (err) {
         console.error("Error al conectar:", err);
         set((state) => ({
            auth: { ...state.auth, checking: false, logged: false }
         }));
         return false
      }
   },

   register: async (email, password) => {
      try {
         const data = await fetchSinToken("auth/register", "POST", { email, password });
         if (data.token) {
            localStorage.setItem("token", data.token)
            set({
               auth: {
                  id: data.user.id,
                  checking: false,
                  logged: true,
                  email: data.user.email
               }
            });
            return true
         }
         return false
         // lógica similar a login...
      } catch (err) {
         console.error("Error al conectar:", err);
         set((state) => ({
            auth: { ...state.auth, checking: false, logged: false }
         }));
         return false
      }
   },

   verifyToken: async (data: Auth) => {
      set({
         auth: {
            id: data.id,
            checking: data.checking,
            logged: data.logged,
            email: data.email
         },
      });
   }
}));

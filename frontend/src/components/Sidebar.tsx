import { useAuthStore } from "../store/auth.store";
import { useChatStore } from "../store/chat.store";
import SidebarItem from "./SidebarItem";


export default function Sidebar() {

   const users = useChatStore().usuarios
   const auth = useAuthStore().auth

   return (

      <div className="inbox_chat">

         {
            users.filter(user => user.id !== auth.id).map(user => (
               <SidebarItem
                  key={user.id}
                  user={user}
               />
            ))
         }




         <div className="extra_space"></div>

      </div>

   );
}

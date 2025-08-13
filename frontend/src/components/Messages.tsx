import { useAuthStore } from "../store/auth.store";
import { useChatStore } from "../store/chat.store";
import IncomingMessages from "./IncomingMessages";
import OutGoingMessages from "./OutGoingMessages";
import SendMessage from "./SemdMessage";

export default function Messages() {

   const mensajes = useChatStore().mensajes
   const auth = useAuthStore().auth


   return (
      <div className="mesgs">
         <div className="msg_history">
            {
               mensajes.map(msg => (
                  msg.paraId === auth.id
                     ? <IncomingMessages key={msg.id} msg={msg} />
                     : <OutGoingMessages key={msg.id} msg={msg} />
               ))
            }
         </div>
         <SendMessage />
      </div>
   );
}

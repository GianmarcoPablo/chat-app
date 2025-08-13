import "../chat.css"
import ChatSelect from "../components/ChatSelect";
import { InboxPeople } from "../components/InboxPeople"
import Messages from "../components/Messages";
import { useChatStore } from "../store/chat.store";

export default function ChatPage() {

   const activeChat = useChatStore().activeChat

   return (
      <div>
         <div className="messaging">
            <div className="inbox_msg">
               <InboxPeople />

               {
                  activeChat
                     ? <Messages />
                     : <ChatSelect />
               }

            </div>
         </div>
      </div>
   );
}

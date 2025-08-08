import "../chat.css"
import ChatSelect from "../components/ChatSelect";
import { InboxPeople } from "../components/InboxPeople"
import Messages from "../components/Messages";

export default function ChatPage() {
   return (
      <div>
         <div className="messaging">
            <div className="inbox_msg">
               <InboxPeople />
               <ChatSelect />
               <Messages />
            </div>
         </div>
      </div>
   );
}

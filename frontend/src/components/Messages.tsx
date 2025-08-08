import IncomingMessages from "./IncomingMessages";
import OutGoingMessages from "./OutGoingMessages";
import SendMessage from "./SemdMessage";

export default function Messages() {
   return (
      <div className="mesgs">
         <div className="msg_history">
            <IncomingMessages />
            <OutGoingMessages />
         </div>
         <SendMessage />
      </div>
   );
}

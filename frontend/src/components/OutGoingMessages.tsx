import type { Mensaje } from "../store/chat.store";

interface Props {
   msg: Mensaje
}

export default function OutGoingMessages({ msg }: Props) {
   return (
      <div className="outgoing_msg">
         <div className="sent_msg">
            <p>{msg.mensaje}</p>
            <span className="time_date"> 11:01 AM | June 9</span>
         </div>
      </div>
   );
}

import type { Mensaje } from "../store/chat.store";


interface Props {
   msg: Mensaje
}

export default function IncomingMessages({ msg }: Props) {
   return (
      <div className="incoming_msg">
         <div className="incoming_msg_img">
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
         </div>
         <div className="received_msg">
            <div className="received_withd_msg">
               <p>{msg.mensaje}</p>
               <span className="time_date"> 11:01 AM | June 9</span>
            </div>
         </div>
      </div>
   );
}

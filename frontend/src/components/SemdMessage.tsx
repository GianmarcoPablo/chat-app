import { useState } from "react";
import { useSocketStore } from "../store/socket.store";
import { useAuthStore } from "../store/auth.store";
import { useChatStore } from "../store/chat.store";

export default function SendMessage() {

   const [mensaje, setMensaje] = useState("");
   const socket = useSocketStore().socket
   const auth = useAuthStore().auth
   const chatState = useChatStore().activeChat

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (mensaje.length === 0) return
      socket?.emit("mensaje-personal", {
         deId: auth.id,
         paraId: chatState,
         mensaje: mensaje
      })
      setMensaje("")
   }

   return (
      <form
         onSubmit={onSubmit}
      >
         <div className="type_msg row">
            <div className="input_msg_write col-sm-9">
               <input
                  type="text"
                  className="write_msg"
                  placeholder="Mensaje..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
               />
            </div>
            <div className="col-sm-3 text-center">
               <button className="msg_send_btn mt-3" type="submit">
                  enviar
               </button>
            </div>
         </div>
      </form>
   );
}

import { useChatStore, type User } from "../store/chat.store";

interface Props {
   user: User
}


export default function SidebarItem({ user }: Props) {

   const setActiveChat = useChatStore().setActiveChat
   const activeChat = useChatStore().activeChat

   return (
      <div className={` chat_list ${user.id === activeChat && "active_chat"}`}
         onClick={() => setActiveChat(user.id)}
      >
         <div className="chat_people">
            <div className="chat_img">
               <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="chat_ib">
               <h5>{user.email} </h5>
               {
                  user.online
                     ? < span className="text-success">Online</span>
                     : <span className="text-danger">Offline</span>
               }
            </div>
         </div>
      </div >
   );
}

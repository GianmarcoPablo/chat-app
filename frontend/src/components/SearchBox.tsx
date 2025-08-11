import { useAuthStore } from "../store/auth.store";


export default function SeachBox() {

   const { auth, verifyToken } = useAuthStore()

   const logout = () => {
      localStorage.removeItem("token")
      verifyToken({ id: null, checking: false, logged: false, email: null })
   }

   return (
      <div className="headind_srch">
         <div className="recent_heading mt-2">
            <h4>{auth.email}</h4>
         </div>
         <div className="srch_bar">
            <div className="stylish-input-group">
               <button className="btn text-danger" onClick={logout}>
                  Salir
               </button>
            </div>
         </div>
      </div>
   );
}

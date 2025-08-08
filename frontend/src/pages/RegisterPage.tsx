import { Link } from "react-router-dom";
import "../login.css"
import { useAuthStore } from "../store/auth.store";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function RegisterPage() {

   const { register } = useAuthStore()

   const [form, setForm] = useState({
      email: "",
      password: "",
   })

   const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target
      setForm({
         ...form,
         [name]: value
      })
   }

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const ok = await register(form.email, form.password)
      console.log({ ok })
      if (!ok) return toast("Algo salio mal")
   }


   const allOk = () => {
      return (form.email.length > 0 && form.password.length > 0) ? true : false
   }

   return (
      <div>
         <Toaster />
         <form onSubmit={onSubmit} className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
               Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
               <input className="input100" type="text" name="name" placeholder="Nombre" />
               <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
               <input className="input100" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} />
               <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
               <input className="input100" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
               <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
               <div className="col text-right">
                  <Link to="/auth/login" className="txt1">
                     Ya tienes cuenta?
                  </Link>
               </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
               <button disabled={!allOk()} type="submit" className="login100-form-btn">
                  Registrar
               </button>
            </div>
         </form>
      </div>
   );
}

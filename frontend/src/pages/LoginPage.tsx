import { Link } from "react-router-dom";
import "../login.css"
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { Toaster, toast } from 'sonner';


export default function LoginPage() {

   const { login } = useAuthStore()

   const [form, setForm] = useState({
      email: "",
      password: "",
      remenberme: true
   })

   const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target
      setForm({
         ...form,
         [name]: value
      })
   }

   const toggleCheck = () => {
      setForm({
         ...form,
         remenberme: !form.remenberme
      })
   }

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (form.remenberme) {
         localStorage.setItem("email", form.email)
      } else {
         localStorage.removeItem("email")
      }
      const ok = await login(form.email, form.password)
      console.log({ ok })
      if (!ok) return toast("Algo salio mal")
   }

   useEffect(() => {
      const remenbermeEmail = localStorage.getItem("email");
      if (remenbermeEmail) {
         setForm({ ...form, remenberme: true, email: remenbermeEmail })
      }
   }, [])

   const allOk = () => {
      return (form.email.length > 0 && form.password.length > 0) ? true : false
   }

   return (
      <div>
         <Toaster />
         <form onSubmit={onSubmit} className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
               Chat - Ingreso
            </span>

            <div className="wrap-input100 validate-input mb-3">
               <input className="input100" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} />
               <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
               <input className="input100" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
               <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
               <div className="col" onClick={toggleCheck}>
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="remenberme" checked={form.remenberme} readOnly />
                  <label className="label-checkbox100">
                     Recordarme
                  </label>
               </div>

               <div className="col text-right">
                  <Link to="/auth/register" className="txt1">
                     Nueva cuenta?
                  </Link>
               </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
               <button disabled={!allOk()} type="submit" className="login100-form-btn">
                  Ingresar
               </button>
            </div>

         </form>
      </div>
   );
}

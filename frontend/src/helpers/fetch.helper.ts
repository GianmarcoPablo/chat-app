export const fetchSinToken = async (endpoint: string, method: string, data?: any) => {
   const url = `http://localhost:8000/api/v1/${endpoint}`
   const options: RequestInit = {
      method,
      headers: {
         "Content-Type": "application/json"
      },
   }
   if (data) {
      options.body = JSON.stringify(data)
   }
   const resp = await fetch(url, options)
   return resp.json()
}

export const fetchConToken = async (endpoint: string, method: string, data?: any) => {
   const url = `http://localhost:8000/api/v1/${endpoint}`
   const token = localStorage.getItem("token") || ""

   const options: RequestInit = {
      method,
      headers: {
         "Content-Type": "application/json",
         "x-token": token
      },
   }
   if (data) {
      options.body = JSON.stringify(data)
   }
   const resp = await fetch(url, options)
   return resp.json()
}

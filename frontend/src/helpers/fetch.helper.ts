export const fetchSinToken = async (endpoint: string, method: string, data?: any) => {
  const url = `http://localhost:8000/api/v1/${endpoint}`
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined
  }

  const resp = await fetch(url, options)
  if (!resp.ok) {
    throw new Error(`Error HTTP: ${resp.status}`)
  }
  return resp.json() // sin await aquí, ya retorna la promesa
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
   return await resp.json()
}

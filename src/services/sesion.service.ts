const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";

const login = async (credenciales: any) => {
  const response = await fetch(`${apiUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  });
  return await response.json();
};

const singUp = async (datas: any) => {
  const response = await fetch(`${apiUrl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datas),
  });
  return await response.json();
};

function validateSession(token: any, Astro: any) {
   if(!token){
      return Astro.redirect("/");  
   }
    return null
}




export { login, singUp, validateSession };

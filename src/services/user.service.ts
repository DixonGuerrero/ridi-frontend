import { type User} from "../types";
const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";

export const getUserByEmail = async (email: string | undefined, token : any) => {
   const response = await fetch(`${apiUrl}useremail/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const user = (await response.json()) ;
    console.log(user)
    return user.user as User;
}

export const getUserById = async (id: number, token:any) => {
    const response = await fetch(`${apiUrl}user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
    const user = (await response.json()) ;
    return user.result.user as User;
}

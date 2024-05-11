import { type MemberProject, type User} from "../types";

const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";


export const getMembersByIdProject = async (project_id: string | any, token : any) => {
   const response = await fetch(`${apiUrl}members/${project_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const member = (await response.json());
    console.log(member)
    return member.members as User[];
}

export const CheckMember = async ( data: MemberProject, token : any) => {

    const response = await fetch(`${apiUrl}member/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const isMember = (await response.json()); 


      return isMember.success;
}



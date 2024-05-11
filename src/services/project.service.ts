import { type MemberJoinProject, type Project} from "../types";

const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";

export const getListProjectsByIdUser = async (user_id: any | undefined, token : any) => {
   const response = await fetch(`${apiUrl}projects/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`${apiUrl}projects/${user_id}`)
    const project = (await response.json()) ;
    console.log(project.projects)
    return project.projects as Project[];
}

export const getProjectById = async (id: any | undefined, token : any) => {
      console.log(`${apiUrl}project/${id}`)
   const response = await fetch(`${apiUrl}project/${id}
   `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const project = (await response.json());

    return project.project[0] as Project;
}

export const createProject = async (project: Project, token : any) => {
    const response = await fetch(`${apiUrl}project/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });
      console.log(response)
      return await response.json();
}

export const deleteProject = async (id: number | undefined, token : any) => {
    const response = await fetch(`${apiUrl}project/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return await response.json();
}

export const joinProject = async (data: MemberJoinProject, token : any) => {
    const response = await fetch(`${apiUrl}project/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      return await response.json();
}


import { type Task} from "../types";
const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";

export const getTaskById = async (id: string | undefined, token : any) => {
   const response = await fetch(`${apiUrl}task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const task = (await response.json());
    return task.task as Task;
}

export const getListTaksByIdProject = async (project_id: string | undefined, token : any) => {
   const response = await fetch(`${apiUrl}tasks/${project_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const task = (await response.json());
    console.log(task) 
    return task.tasks as Task[];
      }
        
export const updateTask = async (id: any, task: Task, token : any) => {
  console.log(task)
   const response = await fetch(`${apiUrl}task/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(task)
    });

    console.log(response)

    return await response.json();
}

export const createTask = async (task: Task, token : any) => {
    const response = await fetch(`${apiUrl}task/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task)
      });
      console.log(response)
      return await response.json();
}

export const deleteTask = async (id: any, token : any) => {
  console.log(apiUrl+'task/delete/'+id)
    const response = await fetch(`${apiUrl}task/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      return await response.json();
}

export const getTasksListIdUser = async (id: number | undefined, token : any) => {
  console.log(`${apiUrl}tasks/user/${id}`)
    const response = await fetch(`${apiUrl}tasks/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const task = (await response.json());
      console.log(task.result.tasks)
      return task.result.tasks as Task[];
}
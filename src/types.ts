export type User = {
    user_id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    image: any;
  }

export type Project = {
  project_id?: number;
  name: string;
  description: string;
  due_date: string;
  image?: any;
  invite_code?: string;
  created_by: number;
}

export type Image = {
  imagen_id: number;
  tipo: string;
  url: string;
}

export type Task = {
  task_id?: number;
  name: string;
  description: string;
  due_date: Date | string;
  estado?: string;
  priority: string;
  project_id: number;
  assigned_user_id: any;
}

export type MemberProject = {
  user_id: any;
  project_id: any;
}

export interface MemberJoinProject {
  user_id: number;
  invite_code: string;
}

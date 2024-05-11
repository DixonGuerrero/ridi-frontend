import React, { useEffect, useState } from 'react';
import useProjectStore from "../store/project.store";
import { getListProjectsByIdUser } from "services/project.service";
import type { Project } from 'types';
import CardProject from './CardProject';

interface ProjectListProps {
   user_id: any;
   token: string;
   }


const ProjectList: React.FC<ProjectListProps> = ({ user_id, token }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { shouldUpdateProjects } = useProjectStore();

  // Función para cargar proyectos
  const loadProjects = async () => {
    try {
      const fetchedProjects = await getListProjectsByIdUser(user_id, token);
      console.log(fetchedProjects)
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

 
  useEffect(() => {
    loadProjects();
  }, [shouldUpdateProjects]);
  return (
    <div className="flex gap-5 my-5 flex-wrap justify-center">
      {projects ? (
        projects.map(project => (
          <CardProject key={project.project_id} user_id={user_id} name={project.name} image={project.image} id={project.project_id} created_by={project.created_by} token={token} estilos="rounded-lg"/>
        ))
      ) : (
        <div className="text-center">
          <p className="text-xl bg-white p-3 rounded-lg text-purple-500 font-bold">No hay proyectos</p>
        </div>
      )}
    </div>
  );
};

export default ProjectList;

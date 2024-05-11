import React, { useState, useEffect } from "react";
import { getMembersByIdProject } from "../services/members.service";
import { getImageById } from "../services/images.service";
import type { User } from "types";

interface ProjectUsersDropdownProps {
  projectId: number | undefined | string;
  token: any;
}

const ProjectUsersDropdown : React.FC<ProjectUsersDropdownProps> = ({ projectId, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const fetchedMembers = await getMembersByIdProject(projectId, token);
      for (let member of fetchedMembers) {
        const image = await getImageById(member.image, token);
        member.image = image.url;
      }
      setMembers(fetchedMembers);
    };
    fetchMembers();
  }, [projectId, token]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        type="button"
        className="text-gray-900 flex justify-center items-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1.5 text-centeritems-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      >
        <svg viewBox="0 0 64 64" className="w-6" fill="currentColor">
         
          <path d="M14 17c3.309 0 6 2.916 6 6.5S17.309 30 14 30s-6-2.916-6-6.5S10.691 17 14 17zM23.246 36.071c-3.464 1.535-6.377 3.921-8.34 6.929H5.585c-1.344 0-2.754-1.135-2.57-2.812C3.521 35.521 8.244 32 14 32 17.876 32 21.278 33.602 23.246 36.071zM60.985 40.181C61.168 41.858 59.749 43 58.409 43c-2.079 0-8.315 0-8.315 0-2.101-3.219-5.288-5.732-9.074-7.245C43.019 33.467 46.291 32 50 32 55.751 32 60.479 35.516 60.985 40.181zM50 17c3.309 0 6 2.916 6 6.5S53.309 30 50 30s-6-2.916-6-6.5S46.691 17 50 17zM47.565 46.613C49.05 49.695 46.597 53 43.431 53c-5.465 0-16.396 0-21.861 0-3.006 0-5.691-3.156-4.135-6.387 2.48-5.15 8.394-8.477 15.065-8.477S45.085 41.463 47.565 46.613zM32 19c4.411 0 8 3.813 8 8.5S36.411 36 32 36s-8-3.813-8-8.5S27.589 19 32 19z"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="z-10 bg-white rounded-lg shadow-lg shadow-blue-500 dark:shadow-purple-500  dark:bg-gray-900 absolute top-40 right-8 mt-2">
          <ul className=" py-2 overflow-y-auto text-gray-700 dark:text-gray-200">
            {members.map((member) => (
              <li key={member.user_id}>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <img
                    className="w-10 h-10 mr-2 rounded-full"
                    src={member.image}
                    alt={member.name}
                  />
                  {member.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProjectUsersDropdown;

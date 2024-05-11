import React, { useState, useEffect } from "react";
import { getMembersByIdProject } from "services/members.service";
import { createTask } from "services/task.service";
import { toast } from "sonner";
import type { Task, User } from "types";
import useTaskStore from "store/tasks.store";

interface TimeInputProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
}

interface FormProps {
  project_id:  any;
  token: string | undefined;
}

const TimeInput: React.FC<TimeInputProps> = ({ id, label, onChange }) => (
  <div className=" mx-auto ">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 ">
      {label}
    </label>
    <input
      type="date"
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

const FormNewTask: React.FC<FormProps> = ({ project_id, token }) => {
  const { toggleShouldUpdateTasks } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("baja");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      const membersFromDb = await getMembersByIdProject(project_id, token);
      setMembers(membersFromDb);
    }

    fetchMembers();
  }, [project_id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask: Task = {
        name,
        description,
        priority,
        estado: "por hacer",
        due_date: new Date(dueDate).toISOString(),
        assigned_user_id: assignedUserId,
        project_id,
      };



      const createTaskPromise  =  createTask(newTask, token);

      toast.promise(createTaskPromise, {
        loading: "Creando tarea...",
        success: (response) => {
          if (response.success) {
            toggleShouldUpdateTasks(true);
            setTimeout(() => setIsOpen(false), 1500);
            return "Tarea creada correctamente";
          } else {
            throw new Error("Error al crear la tarea");
          }
        },
        error: (error) => error.toString(),
      });


      
      
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
        <svg className="icon icon-tabler icon-tabler-square-rounded-plus" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z" fill="currentColor" stroke-width="0"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="lg:w-[400px] w-96 p-10 bg-white rounded-lg shadow">
            <h1 className="text-4xl text-center text-blue-600 font-bold">Crear Task</h1>
            <form method="POST" className="flex flex-col items-center mt-6 w-full" onSubmit={handleSubmit}>
              <div className="w-full">
                <label htmlFor="nombre" className="text-sm font-semibold">Nombre</label>
                <input type="text" name="nombre" id="nombre" className="w-full p-2.5 text-sm text-gray-900 bg-blue-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Ingrese un nombre" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="w-full mt-4">
                <label htmlFor="description" className="block mb-2 text-sm font-semibold">Descripción</label>
                <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600" placeholder="Ingrese la descripción..." required value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="w-full mt-4">
                <label htmlFor="priority" className="block mb-2 text-sm font-semibold">Prioridad</label>
                <select id="priority" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div className="w-full mt-4">
                <TimeInput id="dueDate" label="Fecha de vencimiento:" onChange={setDueDate} />
              </div>
              <div className="w-full mt-4">
                <label htmlFor="assignedUserId" className="block mb-2 text-sm font-semibold">Asignar a:</label>
                <select id="assignedUserId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={assignedUserId} onChange={(e) => setAssignedUserId(e.target.value)}>
                  <option value="">Seleccione un miembro</option>
                  {members.map((member) => (
                    <option key={member.user_id} value={member.user_id}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-3 justify-end items-center mt-4">
                <button type="submit" className="bg-blue-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">Guardar</button>
                <button onClick={() => setIsOpen(false)} type="button" className="bg-red-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormNewTask;

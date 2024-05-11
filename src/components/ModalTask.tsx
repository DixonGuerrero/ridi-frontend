import React from "react";
import { type Task } from "../types";
import { deleteTask } from "../services/task.service";
import { Toaster, toast } from "sonner";
import useTaskStore from "store/tasks.store";
interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  imgUser: string;
  token: any;
}

const TaskDetailModal = ({
  task,
  onClose,
  imgUser,
  token,
}: TaskDetailModalProps) => {
  const { toggleShouldUpdateTasks } = useTaskStore();
  const handleDelete = async (id: any) => {
    toast(
      "Estas seguro de eliminar esta tarea? , si no es asi no te preocupes esta alerta desaparecera en cualquier momento",
      {
        action: {
          label: "Si",
          onClick: () => {
            const deleteTastPromise = deleteTask(id, token);

            toast.promise(deleteTastPromise, {
              loading: "Eliminando tarea...",
              success: (response) => {
                if (response.success) {
                  toggleShouldUpdateTasks(true);
                  setTimeout(() => onClose(), 1500);
                  return "Tarea eliminada correctamente";
                } else {
                  throw new Error("Error al eliminar la tarea");
                }
              },
              error: (error) => error.toString(),
            });
          },
        },
      }
    );
  };

  return (
    <>
      <Toaster position="bottom-left" richColors />
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-lg">
          <div className="">
            <div className="mb-5 border-b-4 mx-auto flex items-center justify-between ">
              <h3
                className="text-xl text-blue-400 leading-6 font-bold
             dark:text-purple-500"
              >
                {task.name}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="">
              <h2 className="font-bold flex items-center gap-2">
                <svg viewBox="0 0 30 30" width="30px" height="30px">
                  {" "}
                  <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M9,16 c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C10,15.552,9.552,16,9,16z M21,16h-8c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1C22,15.552,21.552,16,21,16z M9,10c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1 s1,0.448,1,1C10,9.552,9.552,10,9,10z M21,10h-8c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1 C22,9.552,21.552,10,21,10z M9,22c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C10,21.552,9.552,22,9,22z M21,22h-8 c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1C22,21.552,21.552,22,21,22z" />
                </svg>
                Descripcion
              </h2>
              <p className="text-sm my-2  rounded-lg   font-mediun">
                {task.description}
              </p>

              <div className="flex flex-row gap-10">
                <div className="mt-4">
                  <h2 className="font-bold">Fecha limite</h2>
                  <p className="text-sm my-2  rounded-lg   font-mediun py-2">
                    {task.due_date}
                  </p>
                </div>
                <div className="mt-4">
                  <h2 className="font-bold">Prioridad</h2>
                  <p className="text-sm my-2  rounded-lg   font-mediun bg-green-500 p-2 font-bold text-white">
                    {task.priority}
                  </p>
                </div>
                <div className="mt-4">
                  <h2 className="font-bold">Estado</h2>
                  <p className="text-sm my-2  rounded-lg   font-mediun bg-purple-500 p-2 font-bold text-white">
                    {task.estado}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center my-5 bg-gray-200 rounded-lg p-3">
                <h2 className="font-medium  text-gray-500">Encargado: </h2>
                <img className="w-14 rounded-full" src={imgUser} alt="" />
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => handleDelete(task.task_id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailModal;

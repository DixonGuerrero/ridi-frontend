import { useState, useEffect } from "react";
import { getListTaksByIdProject, updateTask } from "services/task.service";
import { getUserById } from "services/user.service";
import { getImageById } from "services/images.service";
import { type Task } from "types";
import { Toaster, toast } from "sonner";
import useTaskStore from "store/tasks.store";
import ModalTask from "./ModalTask";

//TODO: Mostrar mensaje cuando el proyecto no tiene tareas
interface TaskTablerProps {
  project_id: any;
  token: any;
  client?: string;
}
const TaskTabler: React.FC<TaskTablerProps> = ({ project_id, token }) => {
  const { shouldUpdateTasks, toggleShouldUpdateTasks } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedUserImage, setSelectedUserImage] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userImages, setUserImages] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchTasks() {
      const tasksFromDb = await getListTaksByIdProject(project_id, token);
      if (tasksFromDb == undefined) {
        toast.info("No hay tareas registradas en este proyecto.");
      }
      setTasks(tasksFromDb);
    }
    fetchTasks();
  }, [project_id, token, shouldUpdateTasks]);

  useEffect(() => {
    if (shouldUpdateTasks) {
      async function fetchTasks() {
        const tasksFromDb = await getListTaksByIdProject(project_id, token);
        setTasks(tasksFromDb);
        toggleShouldUpdateTasks(false);
      }

      fetchTasks();
    }
  }, [shouldUpdateTasks, project_id, token]);

  const getList = (estado: string) => {
    return tasks.filter((task) => task.estado === estado);
  };

  const loadUserImages = async (tasks: Task[]) => {
    const images: Record<number, string> = {};
    for (let task of tasks) {
      if (task.assigned_user_id && !userImages[task.assigned_user_id]) {
        const user = await getUserById(task.assigned_user_id, token);
        const image = await getImageById(user.image, token);
        images[task.assigned_user_id] = image.url;
      }
    }
    setUserImages(images);
  };

  const renderUserImage = (userId: number) => {
    console.log(userImages);
    if (userImages[userId]) {
      return (
        <img
          src={userImages[userId]}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      );
    }
    return null;
  };

  const startDrag = (evt: React.DragEvent<HTMLDivElement>, task: Task) => {
    evt.dataTransfer.setData("itemID", String(task.task_id));
    console.log(task.task_id);
  };

  const openTaskDetail = (task: Task, user_id: number) => {
    setSelectedUserImage(userImages[user_id]);
    setSelectedTask(task);
  };

  const closeTaskDetail = () => {
    setSelectedTask(null);
  };

  const draggingOver = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };
  const onDrop = async (
    evt: React.DragEvent<HTMLDivElement>,
    estado: string
  ) => {
    const id = parseInt(evt.dataTransfer.getData("itemID"), 10);
    const itemIndex = tasks.findIndex((task) => task.task_id === id);
    if (itemIndex === -1) return;

    const item = tasks[itemIndex];
    const { task_id, ...restOfTask } = item;

    const updatedTask = {
      ...restOfTask,
      estado,
      due_date: formatISO8601(item.due_date), // Formatea la fecha aquí
    };
    const newState = tasks.map((task) =>
      task.task_id === id
        ? { ...task, ...updatedTask, due_date: item.due_date }
        : task
    );

    setTasks(newState);

    try {
      console.log(updatedTask);
      const result = await updateTask(id, updatedTask, token);
      console.log(await updateTask(id, updatedTask, token));
      if (result.success) {
        toast.success("Tarea actualizada correctamente");
      } else {
        toast.error("Error al actualizar la tarea");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <>
      <Toaster position="bottom-left" richColors />
      {selectedTask && (
        <ModalTask
          task={selectedTask}
          imgUser={selectedUserImage}
          token={token}
          onClose={closeTaskDetail}
        />
      )}
      {tasks != undefined ? (
        <div className="flex flex-wrap  gap-3 flex-col lg:flex-row p-2 ">
          <div className="backdrop-blur-sm flex-grow w-full lg:max-w-[32.5%] rounded-lg min-h-32 border-t-4 p-2  border-purple-400 shadow-sm ">
            <h3 className=" text-purple-400 font-bold  text-2xl rounded-lg my-1  ">
              Por Hacer
            </h3>

            <div
              className="flex min-h-32 flex-col h-full"
              onDragOver={(evt) => draggingOver(evt)}
              onDrop={(evt) => onDrop(evt, "por hacer")}
            >
              {getList("por hacer").map((task) => (
                <div
                  className="rounded-lg bg-white my-2 p-2 flex justify-between items-center"
                  key={task.task_id}
                  draggable="true"
                  onDragStart={(evt) => startDrag(evt, task)}
                  onClick={() => openTaskDetail(task, task.assigned_user_id)}
                >
                  <div>
                    <h4 className="text-xl text-purple-400 font-bold  ">
                      {" "}
                      {task.name}
                    </h4>

                    <p className="text-gray-500">{task.description}</p>
                  </div>

                  <div>{renderUserImage(task.assigned_user_id)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-sm min-h-32 flex-grow w-full lg:max-w-[32.5%] rounded-lg  border-t-4 p-2  border-blue-400">
            <h3 className=" text-blue-400 font-bold  text-2xl rounded-lg my-1  ">
              En Proceso
            </h3>

            <div
              className="flex min-h-32 flex-col h-full"
          
              onDragOver={(evt) => draggingOver(evt)}
              onDrop={(evt) => onDrop(evt, "en proceso")}
            >
              {getList("en proceso").map((task) => (
                <div
                  className="rounded-lg bg-white my-2 p-2 flex justify-between items-center"
                  key={task.task_id}
                  draggable="true"
                  onDragStart={(evt) => startDrag(evt, task)}
                  onClick={() => openTaskDetail(task, task.assigned_user_id)}
                >
                  <div>
                    <h4 className="text-xl text-blue-400 font-bold  ">
                      {" "}
                      {task.name}
                    </h4>

                    <p className="text-gray-500">{task.description}</p>
                  </div>

                  <div>{renderUserImage(task.assigned_user_id)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-sm min-h-32 flex-grow w-full lg:max-w-[32.5%] rounded-lg  border-t-4 p-2  border-green-400">
            <h3 className=" text-green-400 font-bold  text-2xl rounded-lg my-1  ">
              Completado
            </h3>

            <div
              className="flex min-h-32 flex-col h-full"
              onDragOver={(evt) => draggingOver(evt)}
              onDrop={(evt) => onDrop(evt, "completado")}
            >
              {getList("completado").map((task) => (
                <div
                  className="rounded-lg bg-white my-2 p-2 flex justify-between items-center"
                  key={task.task_id}
                  draggable="true"
                  onDragStart={(evt) => startDrag(evt, task)}
                  onClick={() => openTaskDetail(task, task.assigned_user_id)}
                >
                  <div>
                    <h4 className="text-xl text-green-400 font-bold  ">
                      {" "}
                      {task.name}
                    </h4>

                    <p className="text-gray-500">{task.description}</p>
                  </div>

                  <div>{renderUserImage(task.assigned_user_id)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ):(
        <div className="flex justify-center items-center w-full h-96">
       
          <p className="text-xl font-bold text-purple-600 bg-white p-3 rounded-lg">No hay tareas registradas</p>
        
      </div>
      
      
      )}
    </>
  );
};

function formatISO8601(date: any) {
  return new Date(date).toISOString();
}

export default TaskTabler;

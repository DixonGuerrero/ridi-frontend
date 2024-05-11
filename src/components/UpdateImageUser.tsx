
import { type Task } from "../types";
import { Toaster, toast } from "sonner";
interface UpdateImageUserProps {
  task?: Task;
  onClose?: () => void;
  imgUser?: string;
  token?: any;
}

const UpdateImageUser = ({
  task,
  onClose,
  imgUser,
  token,
}: UpdateImageUserProps ) => {

const handleClick = () => {
   toast.info('Esta funcion aun se encuentra en desarrollo')
}


  return (
    <>
      <Toaster position="bottom-left" richColors />
      <button
        onClick={() => handleClick()}
        type="button"
        className="gap-2 bg-blue-500 dark:bg-purple-500 px-5 py-2 my-3 text-white sm:text-sm font-bold rounded-lg"
      >
         Cambiar Foto
      </button>
      
    </>
  );
};

export default UpdateImageUser;

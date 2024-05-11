import React from "react";
import { getImageById } from "../services/images.service";
import Boton from "./Boton";
import { Toaster, toast } from "sonner";
import useProjectStore from "store/project.store";
import { deleteProject } from "services/project.service";

interface Props {
  id: number | undefined;
  estilos?: string;
  name?: string;
  description?: string;
  image?: number;
  user_id?: number;
  token?: string;
  created_by?: number;
}

const defaultImagen = "/public/images/exampleProyect.jpg";
const CardProject: React.FC<Props> = ({
  id,
  estilos,
  name,
  description,
  image,
  user_id,
  token,
  created_by,
}) => {
  const { toggleShouldUpdateProjects } = useProjectStore();
  const [imageUrl, setImageUrl] = React.useState<string>(defaultImagen);

  React.useEffect(() => {
    const fetchImage = async () => {
      if (image) {
        const result = await getImageById(image, token);
        if (result && result.url) {
          setImageUrl(result.url);
        }
      }
    };

    fetchImage();
  }, [image, token]);

  const handleDeleteProject = async () => {
    toast(
      "Estas seguro de eliminar este proyecto? , si no es asi no te preocupes esta alerta desaparecera en cualquier momento",
      {
        action: {
          label: "Eliminar",
          onClick: () => {
            const deleteProjectPromise = deleteProject(id, token);

            toast.promise(deleteProjectPromise, {
              loading: "Eliminando Proyecto...",
              success: (response) => {
                if (response.success) {
                  toggleShouldUpdateProjects(true);
                  setTimeout(() => 1500);
                  return "Proyecto eliminada correctamente";
                } else {
                  throw new Error("Error al eliminar la proyecto");
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
      <div
        className={`${estilos}  flex flex-col bg-blue-100 dark:bg-purple-800 max-w-96`}
      >
        <img className="rounded-t-lg" src={imageUrl} alt="" />
        <div className="flex flex-col justify-between h-full">
          <h3 className="text-xl font-bold p-3 text-gray-700 dark:text-purple-200 sm:text-3xl">
            {name}
          </h3>
          <div className="flex justify-end gap-2 p-3">
            <Boton
              direccion={`/dashboard/${id}`}
              texto="Ver Proyecto"
              estilos="bg-blue-500 px-5 py-2.5 text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l14 0"></path>
                <path d="M15 16l4 -4"></path>
                <path d="M15 8l4 4"></path>
              </svg>
            </Boton>
            {user_id === created_by && (
              <div onClick={handleDeleteProject}>
                <Boton estilos="bg-red-500 px-2 py-3 text-white hover:bg-red-300">
                  <svg
                    viewBox="0 0 30 30"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                  >
                    <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                  </svg>
                </Boton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProject;

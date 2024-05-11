import React from 'react';
import { Toaster, toast } from "sonner";

const TaskDetailModal = () => {
  const handleSignOut = async () => {
 
    const clearCookies = () => {
      return new Promise((resolve, reject) => {
        try {
          document.cookie.split(";").forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
          resolve("Sesion cerrada correctamente");
        } catch (error) {
          reject("Error al eliminar las cookies");
        }
      });
    };

    toast.promise(
      clearCookies(),
      {
        loading: 'Cerrando sesión...',
        success: (data) => {

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return data;
        },
        error: 'Error al cerrar sesión'
      }
    );
  };

  const handleClick = () => {
    toast("¿Quieres cerrar sesión? Si no es así, no te preocupes, este mensaje desaparecerá en cualquier momento", {
      action: {
        label: "Sí, cerrar sesión",
        onClick: handleSignOut,  // Llama a handleSignOut si el usuario confirma
      },
    });
  };

  return (
    <>
      <Toaster position="bottom-left" richColors />
      <button
        onClick={handleClick}
        type="button"
        className="gap-2 bg-red-500 dark:bg-red-500 px-5 py-2 my-3  text-white sm:text-xl font-bold rounded-lg shadow-lg shadow-red-500 "
      >
        Cerrar Sesión
      </button>
    </>
  );
};

export default TaskDetailModal;

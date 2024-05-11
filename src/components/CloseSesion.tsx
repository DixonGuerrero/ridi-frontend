import React from 'react';
import { Toaster, toast } from "sonner";

const TaskDetailModal = () => {
  const clearCookies = () => {
    return new Promise<string>((resolve, reject) => {
      try {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        resolve("Sesión cerrada correctamente");
      } catch (error) {
        reject("Error al eliminar las cookies");
      }
    });
  };

  const handleSignOut = async () => {
    toast.promise(
      clearCookies(),
      {
        loading: 'Cerrando sesión...',
        success: (data) => {
          // Asegúrate de que 'success' devuelva algo adecuado para renderizar como ReactNode
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return <span>{data}</span>; // Asegura que devuelvas un ReactNode aquí
        },
        error: 'Error al cerrar sesión'
      }
    );
  };

  const handleClick = () => {
    toast("¿Quieres cerrar sesión? Si no es así, no te preocupes, este mensaje desaparecerá en cualquier momento", {
      action: {
        label: "Sí, cerrar sesión",
        onClick: handleSignOut,
      },
    });
  };

  return (
    <>
      <Toaster position="bottom-left" richColors />
      <button
        onClick={handleClick}
        type="button"
        className="gap-2 bg-red-500 dark:bg-red-500 px-5 py-2 my-3 text-white sm:text-xl font-bold rounded-lg shadow-lg shadow-red-500 "
      >
        Cerrar Sesión
      </button>
    </>
  );
};

export default TaskDetailModal;

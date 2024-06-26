import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { joinProject } from "../services/project.service";
import type { MemberJoinProject } from "types";
import useProjectStore from "../store/project.store";

interface FormProps {
  user_id: any;
  token: string;
}

const FormJoinProject: React.FC<FormProps> = ({ user_id, token }) => {
  const { toggleShouldUpdateProjects } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [codeInvite, setCodeInvite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newProject: MemberJoinProject = {
        invite_code: codeInvite,
        user_id,
      };

      const joinProjectPromise = joinProject(newProject, token);

      toast.promise(joinProjectPromise, {
        loading: "Uniendo a Proyecto...",
        success: (response) => {
          if (response.success) {
            toggleShouldUpdateProjects(true);
            setTimeout(() => setIsOpen(false), 1500);
            return "Proyecto agregado correctamente";
          } else {
            throw new Error(response.message);
          }
        },
        error: (error) => error.toString(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster position="bottom-left" richColors />
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 "
      >
        <svg viewBox="0 0 520 520" width="25px" height="25px" fill="currentColor">
          <path d="M 272.5 45 A 7.5 7.5 0 0 0 272.5 60 A 7.5 7.5 0 0 0 272.5 45 z M 442.5 50 A 7.5 7.5 0 0 0 442.5 65 A 7.5 7.5 0 0 0 442.5 50 z M 115 75 C 95.701 75 80 90.701 80 110 C 80 129.299 95.701 145 115 145 C 134.299 145 150 129.299 150 110 C 150 90.701 134.299 75 115 75 z M 353.59766 90 C 336.23566 90 319.91177 96.760109 307.63477 109.03711 L 226.31836 190.35547 L 251.06641 215.10352 L 332.38477 133.78711 C 344.10877 122.06311 363.08555 122.06211 374.81055 133.78711 C 386.50755 145.48411 386.50755 164.51684 374.81055 176.21484 L 293.49414 257.53125 L 318.24219 282.2793 L 399.56055 200.96289 C 411.83655 188.68589 418.59766 172.36395 418.59766 155.00195 C 418.59666 119.07795 389.52466 90 353.59766 90 z M 205 130 A 7.5 7.5 0 0 0 205 145 A 7.5 7.5 0 0 0 205 130 z M 297.0293 191.56445 C 291.91205 191.56395 286.79522 193.51873 282.88672 197.42773 L 187.42773 292.88672 C 179.61273 300.70072 179.60973 313.35388 187.42773 321.17188 C 195.24273 328.98687 207.89394 328.98788 215.71094 321.17188 L 311.17188 225.71094 C 318.96888 217.91294 318.96888 205.22473 311.17188 197.42773 C 307.26437 193.52073 302.14655 191.56495 297.0293 191.56445 z M 57.5 207.5 A 7.5 7.5 0 0 0 57.5 222.5 A 7.5 7.5 0 0 0 57.5 207.5 z M 462.5 220 A 7.5 7.5 0 0 0 462.5 235 A 7.5 7.5 0 0 0 462.5 220 z M 180.35352 236.31836 L 99.037109 317.63477 C 73.694109 342.97877 73.694109 384.21459 99.037109 409.55859 C 124.44111 434.96059 165.55594 434.96259 190.96094 409.55859 L 272.27734 328.24219 L 247.5293 303.49414 L 166.21289 384.81055 C 154.48689 396.53655 135.51116 396.53555 123.78516 384.81055 C 112.08816 373.11355 112.08816 354.08177 123.78516 342.38477 L 205.10352 261.06641 L 180.35352 236.31836 z M 425 320 C 413.972 320 405 328.972 405 340 C 405 351.028 413.972 360 425 360 C 436.028 360 445 351.028 445 340 C 445 328.972 436.028 320 425 320 z M 332.5 350 A 7.5 7.5 0 0 0 332.5 365 A 7.5 7.5 0 0 0 332.5 350 z M 72.5 435 A 7.5 7.5 0 0 0 72.5 450 A 7.5 7.5 0 0 0 72.5 435 z M 297.5 450 A 7.5 7.5 0 0 0 297.5 465 A 7.5 7.5 0 0 0 297.5 450 z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="lg:w-[400px] w-96 p-10 bg-white rounded-lg shadow">
            <h1 className="text-4xl text-center text-blue-600 font-bold">
              Unime a Proyecto
            </h1>
            <form
              method="POST"
              className="flex flex-col items-center mt-6 w-full"
              onSubmit={handleSubmit}
            >
              <div className="w-full">
                <label className="text-sm font-semibold" htmlFor="codigo">
                  Codigo
                </label>
                <input
                  type="text"
                  name="codigo"
                  id="codigo"
                  className="w-full p-2.5 text-sm text-gray-900 bg-blue-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Ingrese un codigo"
                  required
                  onChange={(e) => setCodeInvite(e.target.value)}
                />
              </div>

              <div className="flex flex-row gap-3 justify-end items-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="bg-red-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormJoinProject;

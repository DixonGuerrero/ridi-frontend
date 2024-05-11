// Login.tsx
import React, { useState } from "react";
import Boton from "../components/Boton.tsx";
import { Toaster, toast } from "sonner";
import { login } from "../services/sesion.service.ts";



export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 


  const handleLogin = (event: any) => {
    event.preventDefault();

    // Crear una promesa que envuelve la lógica de inicio de sesión.
    const loginPromise = login({ email, password });

    toast.promise(loginPromise, {
      loading: "Cargando...",
      success: (response) => {
        if (response.token) {
          document.cookie = `token=${response.token}; path=/; max-age=86400; SameSite=none; Secure`;
          document.cookie = `email=${response.email}; path=/; max-age=86400; SameSite=none; Secure`;


          setTimeout(() => window.location.href ='/dashboard', 2000);
          return "Inicio de sesión exitoso";
        } else {
          throw new Error("Credenciales incorrectas");
        }
      },
      error: (error) => error.toString(),
    });
  };

  return (
    <>
      <Toaster position="bottom-left" richColors />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full p-12">
        <img
          className="flex-1 sm:w-full lg:max-w-md sm:block hidden"
          src="../../public/images/logo.webp"
          alt="Logo"
        />
        <div className="flex-1 lg:w-[400px] w-full lg:h-[450px] p-10 bg-white rounded-lg shadow">
          <h1 className="text-5xl text-center text-blue-600 font-bold">
            Login
          </h1>
          <form
            method="POST"
            onSubmit={handleLogin}
            className="flex flex-col items-center mt-6 w-full"
          >
            <div className="w-full">
              <label className="text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none"
                placeholder="Ingrese su email"
                required
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <label className="text-sm font-semibold" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none"
                placeholder="Ingrese su contraseña"
                required
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Boton
              tipo="submit"
              estilos="bg-blue-600 mt-6 text-gray-100 px-5 py-2.5"
              texto="Ingresar"
            />
          </form>
          <div className="flex justify-between items-center w-full mt-12 text-lg">
            <a href="signup" className="text-gray-400 font-bold">
              No tienes Cuenta?
            </a>
            <a href="signup" className="text-purple-600 ml-2 font-bold">
              Registrarse
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

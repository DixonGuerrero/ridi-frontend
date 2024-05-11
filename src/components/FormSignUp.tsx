import React, {useState} from 'react';
import Boton from './Boton.tsx';
import { Toaster, toast } from 'sonner';
import { singUp } from '../services/sesion.service.ts';


export default function FormSignUp ()  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSingUp = (event: any) => {
    event.preventDefault();

    // Crear una promesa que envuelve la lógica de inicio de sesión.
    const loginPromise = singUp({ name, email, password });

    toast.promise(loginPromise, {
      loading: "Cargando...",
      success: (response) => {
        if (response.success) {
          setTimeout(() => window.location.href ='/login', 2000);
          return "Cuenta creada exitosamente, inicia sesion";
        } else {
          throw new Error("Datos Invalidos");
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
        src="https://gjcpczwrwrfgfxouxkkg.supabase.co/storage/v1/object/public/ridi-images-resources/logo.webp"
        alt="Logo"
      />
      <div className="flex-1 lg:w-[400px] w-full lg:h-[450px] p-10 bg-white rounded-lg shadow">
        <h1 className="text-5xl text-center text-blue-600 font-bold">
          SingUp
        </h1>
    
        <form method='POST' onSubmit={handleSingUp} className="flex flex-col items-center mt-6 w-full">
          <div className="w-full mt-3">
            <label className="text-sm font-semibold" htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none"
              placeholder="Ingrese su nombre"
              required
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div className="w-full mt-3">
            <label className="text-sm font-semibold" htmlFor="email">Email</label>
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
          <div className="w-full mt-3">
            <label className="text-sm font-semibold" htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none"
              placeholder="Ingrese una contraseña"
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          
          <Boton  texto="Registrarse" estilos="mt-6 bg-blue-600 text-gray-100 px-5 py-2.5" tipo="submit" />
          
        </form>
    
        <div className="flex justify-between items-center w-full text-lg">
          <a href="login" className="text-gray-400 font-bold">Ya tienes Cuenta?</a>
          <a href="login" className="text-purple-600 ml-2 font-bold">Login</a>
        </div>
      </div>
    </div>
  </>
  );
};



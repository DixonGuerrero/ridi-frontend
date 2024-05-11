import React from 'react';

interface BotonProps {
  texto?: string;
  direccion?: string;
  tipo?: "button" | "submit" | "reset" | undefined;
  estilos?: string; 
  children?: React.ReactNode;
}

const Boton: React.FC<BotonProps> = ({ texto, direccion, tipo = "button", estilos, children }) => {
  // Determinar si se renderiza como enlace o botón basado en la presencia de 'direccion'
  if (direccion) {
    return (
      <a
        href={direccion}
        className={`flex justify-center items-center hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-center ${estilos}`}
      >
        
        {texto}
        {children}
      </a>
    );
  } else {
    return (
      <button
        type={tipo}
        className={`flex justify-center items-center hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-center ${estilos}`}
      >
        {children}
        {texto}
      </button>
    );
  }
};

export default Boton;

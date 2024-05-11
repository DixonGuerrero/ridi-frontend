import React from "react";

interface CampoFormularioProps {
   id: string;
   label: string;
   type: string;
   name: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   pattern?: string;
 }

const CampoFormulario: React.FC<CampoFormularioProps>  = ({ id, label, type, name, value, onChange, pattern }) => {
   return (
     <div className="my-3">
       <label htmlFor={id} className="block mb-2 text-sm font-medium text-white dark:text-white">
         {label}
       </label>
       <input
         type={type}
         id={id}
         name={name}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-purple-600 dark:placeholder-blue-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         value={value}
         onChange={onChange}
         pattern={pattern}
         required
       />
     </div>
   );
 };

export default CampoFormulario;
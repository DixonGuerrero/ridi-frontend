import{j as e}from"./jsx-runtime.D5qyYPMi.js";import{r as t}from"./index.CZlPm10g.js";import{g as N}from"./members.service.D8_E1qik.js";import{u as S,c as F}from"./tasks.store.d6dfpnp8.js";import{A as C}from"./index.DOoKv-MU.js";import"./index.JOLg7cur.js";import"./index.DAwUGNE3.js";const T=({id:s,label:a,onChange:o})=>e.jsxs("div",{className:" mx-auto ",children:[e.jsx("label",{htmlFor:s,className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:a}),e.jsx("input",{type:"date",id:s,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:n=>o(n.target.value),required:!0})]}),q=({project_id:s,token:a})=>{const{toggleShouldUpdateTasks:o}=S(),[n,d]=t.useState(!1),[i,g]=t.useState(""),[u,x]=t.useState(""),[b,h]=t.useState("baja"),[f,p]=t.useState(""),[m,y]=t.useState(""),[k,j]=t.useState([]);t.useEffect(()=>{async function r(){const l=await N(s,a);j(l)}r()},[s,a]);const v=async r=>{r.preventDefault();try{const l={name:i,description:u,priority:b,estado:"por hacer",due_date:new Date(f).toISOString(),assigned_user_id:m,project_id:s},w=F(l,a);C.promise(w,{loading:"Creando tarea...",success:c=>{if(c.success)return o(!0),setTimeout(()=>d(!1),1500),"Tarea creada correctamente";throw new Error("Error al crear la tarea")},error:c=>c.toString()})}catch(l){console.error("Failed to create task:",l)}};return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>d(!0),type:"button",className:"text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55",children:e.jsxs("svg",{className:"icon icon-tabler icon-tabler-square-rounded-plus",fill:"currentColor",viewBox:"0 0 24 24",width:"24",height:"24",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z",fill:"currentColor","stroke-width":"0"})]})}),n&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50",children:e.jsxs("div",{className:"lg:w-[400px] w-96 p-10 bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-4xl text-center text-blue-600 font-bold",children:"Crear Task"}),e.jsxs("form",{method:"POST",className:"flex flex-col items-center mt-6 w-full",onSubmit:v,children:[e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"nombre",className:"text-sm font-semibold",children:"Nombre"}),e.jsx("input",{type:"text",name:"nombre",id:"nombre",className:"w-full p-2.5 text-sm text-gray-900 bg-blue-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",placeholder:"Ingrese un nombre",required:!0,value:i,onChange:r=>g(r.target.value)})]}),e.jsxs("div",{className:"w-full mt-4",children:[e.jsx("label",{htmlFor:"description",className:"block mb-2 text-sm font-semibold",children:"Descripción"}),e.jsx("textarea",{id:"description",rows:4,className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600",placeholder:"Ingrese la descripción...",required:!0,value:u,onChange:r=>x(r.target.value)})]}),e.jsxs("div",{className:"w-full mt-4",children:[e.jsx("label",{htmlFor:"priority",className:"block mb-2 text-sm font-semibold",children:"Prioridad"}),e.jsxs("select",{id:"priority",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",value:b,onChange:r=>h(r.target.value),children:[e.jsx("option",{value:"baja",children:"Baja"}),e.jsx("option",{value:"media",children:"Media"}),e.jsx("option",{value:"alta",children:"Alta"})]})]}),e.jsx("div",{className:"w-full mt-4",children:e.jsx(T,{id:"dueDate",label:"Fecha de vencimiento:",onChange:p})}),e.jsxs("div",{className:"w-full mt-4",children:[e.jsx("label",{htmlFor:"assignedUserId",className:"block mb-2 text-sm font-semibold",children:"Asignar a:"}),e.jsxs("select",{id:"assignedUserId",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",value:m,onChange:r=>y(r.target.value),children:[e.jsx("option",{value:"",children:"Seleccione un miembro"}),k.map(r=>e.jsx("option",{value:r.user_id,children:r.name},r.user_id))]})]}),e.jsxs("div",{className:"flex flex-row gap-3 justify-end items-center mt-4",children:[e.jsx("button",{type:"submit",className:"bg-blue-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300",children:"Guardar"}),e.jsx("button",{onClick:()=>d(!1),type:"button",className:"bg-red-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300",children:"Cerrar"})]})]})]})})]})};export{q as default};

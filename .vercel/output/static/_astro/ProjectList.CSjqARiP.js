import{j as e}from"./jsx-runtime.D5qyYPMi.js";import{R as d,r as x}from"./index.CZlPm10g.js";import{u as h,d as b,g as w}from"./project.store.BI1zDguh.js";import{g as P}from"./images.service.D1BH9aap.js";import{B as m}from"./Boton.DHVpEmXo.js";import{A as p}from"./index.DOoKv-MU.js";import"./index.JOLg7cur.js";import"./index.DAwUGNE3.js";const v="/public/images/exampleProyect.jpg",E=({id:s,estilos:a,name:l,description:i,image:o,user_id:c,token:t,created_by:u})=>{const{toggleShouldUpdateProjects:j}=h(),[g,f]=d.useState(v);d.useEffect(()=>{(async()=>{if(o){const r=await P(o,t);r&&r.url&&f(r.url)}})()},[o,t]);const y=async()=>{p("Estas seguro de eliminar este proyecto? , si no es asi no te preocupes esta alerta desaparecera en cualquier momento",{action:{label:"Eliminar",onClick:()=>{const n=b(s,t);p.promise(n,{loading:"Eliminando Proyecto...",success:r=>{if(r.success)return j(!0),setTimeout(()=>1500),"Proyecto eliminada correctamente";throw new Error("Error al eliminar la proyecto")},error:r=>r.toString()})}}})};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:`${a}  flex flex-col bg-blue-100 dark:bg-purple-800 max-w-96`,children:[e.jsx("img",{className:"rounded-t-lg",src:g,alt:""}),e.jsxs("div",{className:"flex flex-col justify-between h-full",children:[e.jsx("h3",{className:"text-xl font-bold p-3 text-gray-700 dark:text-purple-200 sm:text-3xl",children:l}),e.jsxs("div",{className:"flex justify-end gap-2 p-3",children:[e.jsx(m,{direccion:`/dashboard/${s}`,texto:"Ver Proyecto",estilos:"bg-blue-500 px-5 py-2.5 text-white",children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",className:"icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M5 12l14 0"}),e.jsx("path",{d:"M15 16l4 -4"}),e.jsx("path",{d:"M15 8l4 4"})]})}),c===u&&e.jsx("div",{onClick:y,children:e.jsx(m,{estilos:"bg-red-500 px-2 py-3 text-white hover:bg-red-300",children:e.jsx("svg",{viewBox:"0 0 30 30",width:"20px",height:"20px",fill:"currentColor",children:e.jsx("path",{d:"M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"})})})})]})]})]})})},S=({user_id:s,token:a})=>{const[l,i]=x.useState([]),{shouldUpdateProjects:o}=h(),c=async()=>{try{const t=await w(s,a);console.log(t),i(t)}catch(t){console.error("Error fetching projects:",t)}};return x.useEffect(()=>{c()},[o]),e.jsx("div",{className:"flex gap-5 my-5 flex-wrap justify-center",children:l?l.map(t=>e.jsx(E,{user_id:s,name:t.name,image:t.image,id:t.project_id,created_by:t.created_by,token:a,estilos:"rounded-lg"},t.project_id)):e.jsx("div",{className:"text-center",children:e.jsx("p",{className:"text-xl bg-white p-3 rounded-lg text-purple-500 font-bold",children:"No hay proyectos"})})})};export{S as default};

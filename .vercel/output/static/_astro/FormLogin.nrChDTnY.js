import{j as e}from"./jsx-runtime.D5qyYPMi.js";import{r as l}from"./index.CZlPm10g.js";import{B as c}from"./Boton.DHVpEmXo.js";import{J as d,A as u}from"./index.DOoKv-MU.js";import{l as x}from"./sesion.service.BfAn-82Y.js";import"./index.DAwUGNE3.js";function j(){const[o,a]=l.useState(""),[r,n]=l.useState(""),i=s=>{s.preventDefault();const m=x({email:o,password:r});u.promise(m,{loading:"Cargando...",success:t=>{if(t.token)return document.cookie=`token=${t.token}; path=/; max-age=86400; SameSite=none; Secure`,document.cookie=`email=${t.email}; path=/; max-age=86400; SameSite=none; Secure`,setTimeout(()=>window.location.href="/dashboard",2e3),"Inicio de sesión exitoso";throw new Error("Credenciales incorrectas")},error:t=>t.toString()})};return e.jsxs(e.Fragment,{children:[e.jsx(d,{position:"bottom-left",richColors:!0}),e.jsxs("div",{className:"flex flex-col lg:flex-row justify-between items-center lg:items-start w-full p-12",children:[e.jsx("img",{className:"flex-1 sm:w-full lg:max-w-md sm:block hidden",src:"../../public/images/logo.webp",alt:"Logo"}),e.jsxs("div",{className:"flex-1 lg:w-[400px] w-full lg:h-[450px] p-10 bg-white rounded-lg shadow",children:[e.jsx("h1",{className:"text-5xl text-center text-blue-600 font-bold",children:"Login"}),e.jsxs("form",{method:"POST",onSubmit:i,className:"flex flex-col items-center mt-6 w-full",children:[e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"text-sm font-semibold",htmlFor:"email",children:"Email"}),e.jsx("input",{type:"text",name:"email",id:"email",className:"w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none",placeholder:"Ingrese su email",required:!0,onChange:({target:s})=>a(s.value)})]}),e.jsxs("div",{className:"w-full mt-4",children:[e.jsx("label",{className:"text-sm font-semibold",htmlFor:"password",children:"Contraseña"}),e.jsx("input",{type:"password",name:"password",id:"password",className:"w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none",placeholder:"Ingrese su contraseña",required:!0,onChange:({target:s})=>n(s.value)})]}),e.jsx(c,{tipo:"submit",estilos:"bg-blue-600 mt-6 text-gray-100 px-5 py-2.5",texto:"Ingresar"})]}),e.jsxs("div",{className:"flex justify-between items-center w-full mt-12 text-lg",children:[e.jsx("a",{href:"signup",className:"text-gray-400 font-bold",children:"No tienes Cuenta?"}),e.jsx("a",{href:"signup",className:"text-purple-600 ml-2 font-bold",children:"Registrarse"})]})]})]})]})}export{j as default};

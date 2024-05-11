/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_COR_oCTK.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as Boton, $ as $$Layout } from './index_Ubdj3jiH.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { s as singUp, $ as $$ArrowLeft } from './login_DNAuUF-g.mjs';
import { b as $$Boton } from './404_C3vtIQYv.mjs';
/* empty css                           */

function FormSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSingUp = (event) => {
    event.preventDefault();
    const loginPromise = singUp({ name, email, password });
    toast.promise(loginPromise, {
      loading: "Cargando...",
      success: (response) => {
        if (response.success) {
          setTimeout(() => window.location.href = "/login", 2e3);
          return "Cuenta creada exitosamente, inicia sesion";
        } else {
          throw new Error("Datos Invalidos");
        }
      },
      error: (error) => error.toString()
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-left", richColors: true }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row justify-between items-center lg:items-start w-full p-12", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "flex-1 sm:w-full lg:max-w-md sm:block hidden",
          src: "../../public/images/logo.webp",
          alt: "Logo"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 lg:w-[400px] w-full lg:h-[450px] p-10 bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl text-center text-blue-600 font-bold", children: "SingUp" }),
        /* @__PURE__ */ jsxs("form", { method: "POST", onSubmit: handleSingUp, className: "flex flex-col items-center mt-6 w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full mt-3", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold", htmlFor: "name", children: "Nombre" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "name",
                id: "name",
                className: "w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none",
                placeholder: "Ingrese su nombre",
                required: true,
                onChange: ({ target }) => setName(target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full mt-3", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold", htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "email",
                id: "email",
                className: "w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none",
                placeholder: "Ingrese su email",
                required: true,
                onChange: ({ target }) => setEmail(target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full mt-3", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold", htmlFor: "password", children: "Contraseña" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                name: "password",
                id: "password",
                className: "w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none",
                placeholder: "Ingrese una contraseña",
                required: true,
                onChange: ({ target }) => setPassword(target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Boton, { texto: "Registrarse", estilos: "mt-6 bg-blue-600 text-gray-100 px-5 py-2.5", tipo: "submit" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full text-lg", children: [
          /* @__PURE__ */ jsx("a", { href: "login", className: "text-gray-400 font-bold", children: "Ya tienes Cuenta?" }),
          /* @__PURE__ */ jsx("a", { href: "login", className: "text-purple-600 ml-2 font-bold", children: "Login" })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signup;
  const token = Astro2.cookies.get("token")?.value;
  if (token !== void 0) {
    return Astro2.redirect("/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Creando una Cuenta para ingresar a RIDI", "data-astro-cid-sgjovbj7": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex justify-center items-center h-screen w-full flex-col" data-astro-cid-sgjovbj7> ${renderComponent($$result2, "Boton", $$Boton, { "direccion": "/", "texto": "Regresar", "estilos": "bg-purple-600 text-gray-100 py-2.5 px-5 mb-4", "data-astro-cid-sgjovbj7": true }, { "before": ($$result3) => renderTemplate`${renderComponent($$result3, "ArrowLeft", $$ArrowLeft, { "slot": "before", "color": "white", "data-astro-cid-sgjovbj7": true })}` })} <div class="rounded container-xl" data-astro-cid-sgjovbj7> ${renderComponent($$result2, "FormSignUp", FormSignUp, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/FormSignUp", "client:component-export": "default", "data-astro-cid-sgjovbj7": true })} </div> </main> ` })} `;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/signup.astro", void 0);

const $$file = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/signup.astro";
const $$url = "/signup";

export { $$Signup as default, $$file as file, $$url as url };

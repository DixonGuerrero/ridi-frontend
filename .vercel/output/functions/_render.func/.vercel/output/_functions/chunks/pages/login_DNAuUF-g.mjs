/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, g as renderComponent } from '../astro_COR_oCTK.mjs';
import 'kleur/colors';
import 'html-escaper';
import { B as Boton, $ as $$Layout } from './index_Ubdj3jiH.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import 'clsx';
import { b as $$Boton } from './404_C3vtIQYv.mjs';
/* empty css                          */

const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";
const login$1 = async (credenciales) => {
  const response = await fetch(`${apiUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credenciales)
  });
  return await response.json();
};
const singUp = async (datas) => {
  const response = await fetch(`${apiUrl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datas)
  });
  return await response.json();
};

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    const loginPromise = login$1({ email, password });
    toast.promise(loginPromise, {
      loading: "Cargando...",
      success: (response) => {
        if (response.token) {
          document.cookie = `token=${response.token}; path=/; max-age=86400; SameSite=none; Secure`;
          document.cookie = `email=${response.email}; path=/; max-age=86400; SameSite=none; Secure`;
          setTimeout(() => window.location.href = "/dashboard", 2e3);
          return "Inicio de sesión exitoso";
        } else {
          throw new Error("Credenciales incorrectas");
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
        /* @__PURE__ */ jsx("h1", { className: "text-5xl text-center text-blue-600 font-bold", children: "Login" }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            method: "POST",
            onSubmit: handleLogin,
            className: "flex flex-col items-center mt-6 w-full",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
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
              /* @__PURE__ */ jsxs("div", { className: "w-full mt-4", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold", htmlFor: "password", children: "Contraseña" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    name: "password",
                    id: "password",
                    className: "w-full p-2 text-sm font-semibold rounded-xl bg-blue-100 border-none focus:outline-none",
                    placeholder: "Ingrese su contraseña",
                    required: true,
                    onChange: ({ target }) => setPassword(target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Boton,
                {
                  tipo: "submit",
                  estilos: "bg-blue-600 mt-6 text-gray-100 px-5 py-2.5",
                  texto: "Ingresar"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full mt-12 text-lg", children: [
          /* @__PURE__ */ jsx("a", { href: "signup", className: "text-gray-400 font-bold", children: "No tienes Cuenta?" }),
          /* @__PURE__ */ jsx("a", { href: "signup", className: "text-purple-600 ml-2 font-bold", children: "Registrarse" })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro$1 = createAstro();
const $$ArrowLeft = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ArrowLeft;
  const { color } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"${addAttribute(color, "stroke")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l14 0"></path><path d="M5 12l4 4"></path><path d="M5 12l4 -4"></path></svg>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/public/icons/arrowLeft.astro", void 0);

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const token = Astro2.cookies.get("token")?.value;
  if (token !== void 0) {
    return Astro2.redirect("/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login para Ingresar a RIDI", "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex justify-center items-center h-screen w-full flex-col" data-astro-cid-sgpqyurt> ${renderComponent($$result2, "Boton", $$Boton, { "direccion": "/", "texto": "Regresar", "estilos": "bg-purple-600 text-gray-100 py-2.5 px-5 mb-4", "data-astro-cid-sgpqyurt": true }, { "before": ($$result3) => renderTemplate`${renderComponent($$result3, "ArrowLeft", $$ArrowLeft, { "slot": "before", "color": "white", "data-astro-cid-sgpqyurt": true })}` })} <div class="rounded container-xl" data-astro-cid-sgpqyurt> ${renderComponent($$result2, "FormLogin", FormLogin, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/FormLogin", "client:component-export": "default", "data-astro-cid-sgpqyurt": true })} </div> </main> ` })} `;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/login.astro", void 0);

const $$file = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/login.astro";
const $$url = "/login";

const login = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ArrowLeft as $, login as l, singUp as s };

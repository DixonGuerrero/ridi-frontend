/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute } from '../astro_COR_oCTK.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as getUserByEmail, g as getImageById, $ as $$Dashboard } from './404_C3vtIQYv.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Toaster, toast } from 'sonner';
import 'react';

const UpdateImageUser = ({
  task,
  onClose,
  imgUser,
  token
}) => {
  const handleClick = () => {
    toast.info("Esta funcion aun se encuentra en desarrollo");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-left", richColors: true }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleClick(),
        type: "button",
        className: "gap-2 bg-blue-500 dark:bg-purple-500 px-5 py-2 my-3 text-white sm:text-sm font-bold rounded-lg",
        children: "Cambiar Foto"
      }
    )
  ] });
};

const TaskDetailModal = () => {
  const clearCookies = () => {
    return new Promise((resolve, reject) => {
      try {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + (/* @__PURE__ */ new Date()).toUTCString() + ";path=/");
        });
        resolve("Sesión cerrada correctamente");
      } catch (error) {
        reject("Error al eliminar las cookies");
      }
    });
  };
  const handleSignOut = async () => {
    toast.promise(
      clearCookies(),
      {
        loading: "Cerrando sesión...",
        success: (data) => {
          setTimeout(() => {
            window.location.href = "/";
          }, 2e3);
          return /* @__PURE__ */ jsx("span", { children: data });
        },
        error: "Error al cerrar sesión"
      }
    );
  };
  const handleClick = () => {
    toast("¿Quieres cerrar sesión? Si no es así, no te preocupes, este mensaje desaparecerá en cualquier momento", {
      action: {
        label: "Sí, cerrar sesión",
        onClick: handleSignOut
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-left", richColors: true }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleClick,
        type: "button",
        className: "gap-2 bg-red-500 dark:bg-red-500 px-5 py-2 my-3 text-white sm:text-xl font-bold rounded-lg shadow-lg shadow-red-500 ",
        children: "Cerrar Sesión"
      }
    )
  ] });
};

const UpdateDataUser = ({}) => {
  const handleClick = () => {
    toast.info("Esta funcion aun se encuentra en desarrollo");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-left", richColors: true }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleClick(),
        type: "button",
        className: "gap-2 bg-blue-500 dark:bg-purple-500 px-5 py-2 my-3 text-white sm:text-sm font-bold rounded-lg",
        children: "Actualizar Datos"
      }
    )
  ] });
};

const $$Astro = createAstro();
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  const token = Astro2.cookies.get("token")?.value;
  const email = Astro2.cookies.get("email")?.value;
  if (!token) {
    return Astro2.redirect("/");
  }
  const authorization = true;
  const user = await getUserByEmail(email, token);
  const imagen = await getImageById(user.image, token);
  user.image = imagen.url;
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "authorization": authorization, "title": "Ajustes de Cuenta" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dark:bg-gray-800 flex items-center justify-between bg-white rounded-lg"> <p class="text-3xl text-blue-500 font-bold dark:text-purple-500">
Configuracion
</p> </div> <div class="flex flex-col sm:flex-row justify-center items-center w-full"> <div class="flex-1 flex flex-col justify-center items-center w-full my-10"> <img class="rounded-full size-40 sm:size-64 shadow-lg shadow-blue-500 dark:shadow-purple-500"${addAttribute(user.image, "src")} alt=""> ${renderComponent($$result2, "UpdateImageUser", UpdateImageUser, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "components/UpdateImageUser", "client:component-export": "default" })} ${renderComponent($$result2, "UpdateDataUser", UpdateDataUser, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "components/UpdateUser", "client:component-export": "default" })} ${renderComponent($$result2, "CloseSesion", TaskDetailModal, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "components/CloseSesion", "client:component-export": "default" })} </div> </div> ` })}`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/settings.astro", void 0);

const $$file = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/settings.astro";
const $$url = "/dashboard/settings";

export { $$Settings as default, $$file as file, $$url as url };

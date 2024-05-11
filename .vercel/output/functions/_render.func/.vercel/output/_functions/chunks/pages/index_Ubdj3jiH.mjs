/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute, h as renderHead, f as renderSlot } from '../astro_COR_oCTK.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as getImageById, a as getUserByEmail, $ as $$Dashboard } from './404_C3vtIQYv.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import create from 'zustand';
import { d as deleteProject, g as getListProjectsByIdUser, c as createProject, j as joinProject } from './_id__DxRNB3TT.mjs';
import { toast, Toaster } from 'sonner';
import 'clsx';
/* empty css                          */
/* empty css                          */

const useProjectStore = create((set) => ({
   shouldUpdateProjects: false,
   toggleShouldUpdateProjects: () => set((state) => ({
      shouldUpdateProjects: !state.shouldUpdateProjects
   })),
}));

const Boton = ({ texto, direccion, tipo = "button", estilos, children }) => {
  if (direccion) {
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href: direccion,
        className: `flex justify-center items-center hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-center ${estilos}`,
        children: [
          texto,
          children
        ]
      }
    );
  } else {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: tipo,
        className: `flex justify-center items-center hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-center ${estilos}`,
        children: [
          children,
          texto
        ]
      }
    );
  }
};

const defaultImagen = "/public/images/exampleProyect.jpg";
const CardProject = ({
  id,
  estilos,
  name,
  description,
  image,
  user_id,
  token,
  created_by
}) => {
  const { toggleShouldUpdateProjects } = useProjectStore();
  const [imageUrl, setImageUrl] = React.useState(defaultImagen);
  React.useEffect(() => {
    const fetchImage = async () => {
      if (image) {
        const result = await getImageById(image, token);
        if (result && result.url) {
          setImageUrl(result.url);
        }
      }
    };
    fetchImage();
  }, [image, token]);
  const handleDeleteProject = async () => {
    toast(
      "Estas seguro de eliminar este proyecto? , si no es asi no te preocupes esta alerta desaparecera en cualquier momento",
      {
        action: {
          label: "Eliminar",
          onClick: () => {
            const deleteProjectPromise = deleteProject(id, token);
            toast.promise(deleteProjectPromise, {
              loading: "Eliminando Proyecto...",
              success: (response) => {
                if (response.success) {
                  toggleShouldUpdateProjects(true);
                  setTimeout(() => 1500);
                  return "Proyecto eliminada correctamente";
                } else {
                  throw new Error("Error al eliminar la proyecto");
                }
              },
              error: (error) => error.toString()
            });
          }
        }
      }
    );
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${estilos}  flex flex-col bg-blue-100 dark:bg-purple-800 max-w-96`,
      children: [
        /* @__PURE__ */ jsx("img", { className: "rounded-t-lg", src: imageUrl, alt: "" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between h-full", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold p-3 text-gray-700 dark:text-purple-200 sm:text-3xl", children: name }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 p-3", children: [
            /* @__PURE__ */ jsx(
              Boton,
              {
                direccion: `/dashboard/${id}`,
                texto: "Ver Proyecto",
                estilos: "bg-blue-500 px-5 py-2.5 text-white",
                children: /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    className: "icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right",
                    children: [
                      /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                      /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" }),
                      /* @__PURE__ */ jsx("path", { d: "M15 16l4 -4" }),
                      /* @__PURE__ */ jsx("path", { d: "M15 8l4 4" })
                    ]
                  }
                )
              }
            ),
            user_id === created_by && /* @__PURE__ */ jsx("div", { onClick: handleDeleteProject, children: /* @__PURE__ */ jsx(Boton, { estilos: "bg-red-500 px-2 py-3 text-white hover:bg-red-300", children: /* @__PURE__ */ jsx(
              "svg",
              {
                viewBox: "0 0 30 30",
                width: "20px",
                height: "20px",
                fill: "currentColor",
                children: /* @__PURE__ */ jsx("path", { d: "M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" })
              }
            ) }) })
          ] })
        ] })
      ]
    }
  ) });
};

const ProjectList = ({ user_id, token }) => {
  const [projects, setProjects] = useState([]);
  const { shouldUpdateProjects } = useProjectStore();
  const loadProjects = async () => {
    try {
      const fetchedProjects = await getListProjectsByIdUser(user_id, token);
      console.log(fetchedProjects);
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    loadProjects();
  }, [shouldUpdateProjects]);
  return /* @__PURE__ */ jsx("div", { className: "flex gap-5 my-5 flex-wrap justify-center", children: projects ? projects.map((project) => /* @__PURE__ */ jsx(CardProject, { user_id, name: project.name, image: project.image, id: project.project_id, created_by: project.created_by, token, estilos: "rounded-lg" }, project.project_id)) : /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("p", { className: "text-xl bg-white p-3 rounded-lg text-purple-500 font-bold", children: "No hay proyectos" }) }) });
};

const TimeInput = ({ id, label, onChange }) => /* @__PURE__ */ jsxs("div", { className: " mx-auto ", children: [
  /* @__PURE__ */ jsx("label", { htmlFor: id, className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white", children: label }),
  /* @__PURE__ */ jsx(
    "input",
    {
      type: "date",
      id,
      className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
      onChange: (e) => onChange(e.target.value),
      required: true
    }
  )
] });
const FormNewProject = ({ user_id, token }) => {
  const { toggleShouldUpdateProjects } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = {
        name,
        description,
        due_date: new Date(time).toISOString(),
        image: 1,
        created_by: user_id
      };
      const createProjectPromise = createProject(newProject, token);
      toast.promise(createProjectPromise, {
        loading: "Creando Proyecto...",
        success: (response) => {
          if (response.success) {
            toggleShouldUpdateProjects(true);
            setTimeout(() => setIsOpen(false), 1500);
            return "Proyecto creada correctamente";
          } else {
            throw new Error("Error al crear el proyecto");
          }
        },
        error: (error) => error.toString()
      });
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-left", richColors: true }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(true),
        type: "button",
        className: "text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ",
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "icon icon-tabler icon-tabler-square-rounded-plus",
            fill: "currentColor",
            viewBox: "0 0 24 24",
            width: "24",
            height: "24",
            children: [
              /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z",
                  fill: "currentColor",
                  "stroke-width": "0"
                }
              )
            ]
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "lg:w-[400px] w-96 p-10 bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl text-center text-blue-600 font-bold", children: "Crear Proyecto" }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          method: "POST",
          className: "flex flex-col items-center mt-6 w-full",
          onSubmit: handleSubmit,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold", htmlFor: "nombre", children: "Nombre" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "nombre",
                  id: "nombre",
                  className: "w-full p-2.5 text-sm text-gray-900 bg-blue-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                  placeholder: "Ingrese un nombre",
                  required: true,
                  onChange: (e) => setName(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full mt-4", children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: "block mb-2 text-sm font-semibold",
                  htmlFor: "message",
                  children: "Descripcion"
                }
              ),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "message",
                  rows: 4,
                  className: "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600",
                  placeholder: "Ingrese la descripcion...",
                  required: true,
                  onChange: (e) => setDescription(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full mt-4", children: /* @__PURE__ */ jsx(
              TimeInput,
              {
                id: "time",
                label: "Seleccione la fecha:",
                onChange: setTime
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3 justify-end items-center mt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "bg-blue-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300",
                  children: "Guardar"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsOpen(false),
                  type: "button",
                  className: "bg-red-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300",
                  children: "Cerrar"
                }
              )
            ] })
          ]
        }
      )
    ] }) })
  ] });
};

const FormJoinProject = ({ user_id, token }) => {
  const { toggleShouldUpdateProjects } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [codeInvite, setCodeInvite] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = {
        invite_code: codeInvite,
        user_id
      };
      const joinProjectPromise = joinProject(newProject, token);
      toast.promise(joinProjectPromise, {
        loading: "Uniendo a Proyecto...",
        success: (response) => {
          if (response.success) {
            toggleShouldUpdateProjects(true);
            setTimeout(() => setIsOpen(false), 1500);
            return "Proyecto agregado correctamente";
          } else {
            throw new Error(response.message);
          }
        },
        error: (error) => error.toString()
      });
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-left", richColors: true }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(true),
        type: "button",
        className: "text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ",
        children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 520 520", width: "25px", height: "25px", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M 272.5 45 A 7.5 7.5 0 0 0 272.5 60 A 7.5 7.5 0 0 0 272.5 45 z M 442.5 50 A 7.5 7.5 0 0 0 442.5 65 A 7.5 7.5 0 0 0 442.5 50 z M 115 75 C 95.701 75 80 90.701 80 110 C 80 129.299 95.701 145 115 145 C 134.299 145 150 129.299 150 110 C 150 90.701 134.299 75 115 75 z M 353.59766 90 C 336.23566 90 319.91177 96.760109 307.63477 109.03711 L 226.31836 190.35547 L 251.06641 215.10352 L 332.38477 133.78711 C 344.10877 122.06311 363.08555 122.06211 374.81055 133.78711 C 386.50755 145.48411 386.50755 164.51684 374.81055 176.21484 L 293.49414 257.53125 L 318.24219 282.2793 L 399.56055 200.96289 C 411.83655 188.68589 418.59766 172.36395 418.59766 155.00195 C 418.59666 119.07795 389.52466 90 353.59766 90 z M 205 130 A 7.5 7.5 0 0 0 205 145 A 7.5 7.5 0 0 0 205 130 z M 297.0293 191.56445 C 291.91205 191.56395 286.79522 193.51873 282.88672 197.42773 L 187.42773 292.88672 C 179.61273 300.70072 179.60973 313.35388 187.42773 321.17188 C 195.24273 328.98687 207.89394 328.98788 215.71094 321.17188 L 311.17188 225.71094 C 318.96888 217.91294 318.96888 205.22473 311.17188 197.42773 C 307.26437 193.52073 302.14655 191.56495 297.0293 191.56445 z M 57.5 207.5 A 7.5 7.5 0 0 0 57.5 222.5 A 7.5 7.5 0 0 0 57.5 207.5 z M 462.5 220 A 7.5 7.5 0 0 0 462.5 235 A 7.5 7.5 0 0 0 462.5 220 z M 180.35352 236.31836 L 99.037109 317.63477 C 73.694109 342.97877 73.694109 384.21459 99.037109 409.55859 C 124.44111 434.96059 165.55594 434.96259 190.96094 409.55859 L 272.27734 328.24219 L 247.5293 303.49414 L 166.21289 384.81055 C 154.48689 396.53655 135.51116 396.53555 123.78516 384.81055 C 112.08816 373.11355 112.08816 354.08177 123.78516 342.38477 L 205.10352 261.06641 L 180.35352 236.31836 z M 425 320 C 413.972 320 405 328.972 405 340 C 405 351.028 413.972 360 425 360 C 436.028 360 445 351.028 445 340 C 445 328.972 436.028 320 425 320 z M 332.5 350 A 7.5 7.5 0 0 0 332.5 365 A 7.5 7.5 0 0 0 332.5 350 z M 72.5 435 A 7.5 7.5 0 0 0 72.5 450 A 7.5 7.5 0 0 0 72.5 435 z M 297.5 450 A 7.5 7.5 0 0 0 297.5 465 A 7.5 7.5 0 0 0 297.5 450 z" }) })
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "lg:w-[400px] w-96 p-10 bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl text-center text-blue-600 font-bold", children: "Unime a Proyecto" }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          method: "POST",
          className: "flex flex-col items-center mt-6 w-full",
          onSubmit: handleSubmit,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold", htmlFor: "codigo", children: "Codigo" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "codigo",
                  id: "codigo",
                  className: "w-full p-2.5 text-sm text-gray-900 bg-blue-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                  placeholder: "Ingrese un codigo",
                  required: true,
                  onChange: (e) => setCodeInvite(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3 justify-end items-center mt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "bg-blue-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300",
                  children: "Guardar"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsOpen(false),
                  type: "button",
                  className: "bg-red-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300",
                  children: "Cerrar"
                }
              )
            ] })
          ]
        }
      )
    ] }) })
  ] });
};

const $$Astro$4 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$1;
  const token = Astro2.cookies.get("token")?.value;
  const email = Astro2.cookies.get("email")?.value;
  if (!token) {
    return Astro2.redirect("/");
  }
  const authorization = true;
  const user = await getUserByEmail(email, token);
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "authorization": authorization, "title": "Dashboard RIDI -> Bienvenido" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dark:bg-gray-800 flex items-center justify-between bg-white rounded-lg"> <p class="text-3xl text-blue-500 font-bold dark:text-purple-500">
Proyectos
</p> <div class="flex gap-4 items-center p-2 bg-blue-200 rounded"> ${renderComponent($$result2, "FormNewProject", FormNewProject, { "client:idle": true, "user_id": user.user_id, "token": token, "client:component-hydration": "idle", "client:component-path": "components/FormNewProject", "client:component-export": "default" })} ${renderComponent($$result2, "FormJoinProject", FormJoinProject, { "client:idle": true, "user_id": user.user_id, "token": token, "client:component-hydration": "idle", "client:component-path": "components/FormJoinProyect", "client:component-export": "default" })} </div> </div> ${renderComponent($$result2, "ProjectsList", ProjectList, { "client:idle": true, "user_id": user.user_id, "token": token, "client:component-hydration": "idle", "client:component-path": "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/ProjectList", "client:component-export": "default" })} ` })}`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/index.astro", void 0);

const $$file$1 = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/index.astro";
const $$url$1 = "/dashboard";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$Index$1,
   file: $$file$1,
   url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="../../public/images/logo.webp"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/layouts/Layout.astro", void 0);

const $$Astro$2 = createAstro();
const $$NavLP = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavLP;
  return renderTemplate`${maybeRenderHead()}<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 "> <div class="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4"> <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse"> <img src="../../public/images/logo.webp" class="h-20" alt="RIDI Logo"> </a> <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"> <a href="login" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</a> <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false"> <span class="sr-only">Menu</span> <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path> </svg> </button> </div> <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky"> <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"> <li> <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Inicio</a> </li> <li> <a href="#" class="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Beneficio</a> </li> <li> <a href="#" class="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contacto</a> </li> </ul> </div> </div> </nav>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/NavLP.astro", void 0);

const $$Astro$1 = createAstro();
const $$HeroLP = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeroLP;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col-reverse items-center justify-between w-full h-screen lg:flex-row md:flex-row-reverse   mt-20 lg:mt-0"> <div class="text-start flex flex-col justify-center flex-1"> <h1 class="text-blue-600 text-2xl md:text-6xl font-bold">Desde la idea hasta la realización con <span class="text-purple-600">RIDI</span></h1> <p class="text-sm md:text-xl font-semibold text-gray-700">Organiza, planifica y ejecuta tus proyectos con facilidad utilizando <span>RIDI</span></p> <a href="/login" class="text-white w-48 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2 text-center me-2 mb-2 my-5">¡Empezar Ahora!</a> </div> <div class="flex-1 flex justify-start"> <img src="../../public/images/hero.gif" alt="Imagen Principal" class="w-full max-w-5xl md:max-w-none md:w-full lg:ml-11"> </div> </div>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/HeroLP.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Bienvedido a RIDI", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", "<main data-astro-cid-j7pv25f6> ", " ", ' <!--    <BeneficiosLandingPage /> --> <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"><\/script> </main>  '])), maybeRenderHead(), renderComponent($$result2, "NavLandingPage", $$NavLP, { "data-astro-cid-j7pv25f6": true }), renderComponent($$result2, "HeroLandingPage", $$HeroLP, { "data-astro-cid-j7pv25f6": true })) })} `;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$Index,
   file: $$file,
   url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, Boton as B, index as a, index$1 as i };

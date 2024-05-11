/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute } from '../astro_COR_oCTK.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as getImageById, a as getUserByEmail, $ as $$Dashboard } from './404_C3vtIQYv.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import create from 'zustand';
/* empty css                         */

const apiUrl$2 = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";
const createTask = async (task, token) => {
  const response = await fetch(`${apiUrl$2}task/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  console.log(response);
  return await response.json();
};
const getTasksListIdUser = async (id, token) => {
  console.log(`${apiUrl$2}tasks/user/${id}`);
  const response = await fetch(`${apiUrl$2}tasks/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const task = await response.json();
  console.log(task.result.tasks);
  return task.result.tasks;
};

const apiUrl$1 = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";
const getListProjectsByIdUser = async (user_id, token) => {
  const response = await fetch(`${apiUrl$1}projects/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  console.log(`${apiUrl$1}projects/${user_id}`);
  const project = await response.json();
  console.log(project.projects);
  return project.projects;
};
const getProjectById = async (id, token) => {
  console.log(`${apiUrl$1}project/${id}`);
  const response = await fetch(`${apiUrl$1}project/${id}
   `, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const project = await response.json();
  return project.project[0];
};
const createProject = async (project, token) => {
  const response = await fetch(`${apiUrl$1}project/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(project)
  });
  console.log(response);
  return await response.json();
};
const deleteProject = async (id, token) => {
  const response = await fetch(`${apiUrl$1}project/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
};
const joinProject = async (data, token) => {
  const response = await fetch(`${apiUrl$1}project/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};

const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";
const getMembersByIdProject = async (project_id, token) => {
  const response = await fetch(`${apiUrl}members/${project_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const member = await response.json();
  console.log(member);
  return member.members;
};
const CheckMember = async (data, token) => {
  const response = await fetch(`${apiUrl}member/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  const isMember = await response.json();
  return isMember.success;
};

const useTaskStore = create((set) => ({
  shouldUpdateTasks: false,
  toggleShouldUpdateTasks: () => set((state) => ({ 
   shouldUpdateTasks: !state.shouldUpdateTasks })),
}));

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
const FormNewTask = ({ project_id, token }) => {
  const { toggleShouldUpdateTasks } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("baja");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [members, setMembers] = useState([]);
  useEffect(() => {
    async function fetchMembers() {
      const membersFromDb = await getMembersByIdProject(project_id, token);
      setMembers(membersFromDb);
    }
    fetchMembers();
  }, [project_id, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        name,
        description,
        priority,
        estado: "por hacer",
        due_date: new Date(dueDate).toISOString(),
        assigned_user_id: assignedUserId,
        project_id
      };
      const createTaskPromise = createTask(newTask, token);
      toast.promise(createTaskPromise, {
        loading: "Creando tarea...",
        success: (response) => {
          if (response.success) {
            toggleShouldUpdateTasks(true);
            setTimeout(() => setIsOpen(false), 1500);
            return "Tarea creada correctamente";
          } else {
            throw new Error("Error al crear la tarea");
          }
        },
        error: (error) => error.toString()
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(true), type: "button", className: "text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55", children: /* @__PURE__ */ jsxs("svg", { className: "icon icon-tabler icon-tabler-square-rounded-plus", fill: "currentColor", viewBox: "0 0 24 24", width: "24", height: "24", children: [
      /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z", fill: "currentColor", "stroke-width": "0" })
    ] }) }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "lg:w-[400px] w-96 p-10 bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl text-center text-blue-600 font-bold", children: "Crear Task" }),
      /* @__PURE__ */ jsxs("form", { method: "POST", className: "flex flex-col items-center mt-6 w-full", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "nombre", className: "text-sm font-semibold", children: "Nombre" }),
          /* @__PURE__ */ jsx("input", { type: "text", name: "nombre", id: "nombre", className: "w-full p-2.5 text-sm text-gray-900 bg-blue-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white", placeholder: "Ingrese un nombre", required: true, value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mt-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "block mb-2 text-sm font-semibold", children: "Descripción" }),
          /* @__PURE__ */ jsx("textarea", { id: "description", rows: 4, className: "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600", placeholder: "Ingrese la descripción...", required: true, value: description, onChange: (e) => setDescription(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mt-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "priority", className: "block mb-2 text-sm font-semibold", children: "Prioridad" }),
          /* @__PURE__ */ jsxs("select", { id: "priority", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", value: priority, onChange: (e) => setPriority(e.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "baja", children: "Baja" }),
            /* @__PURE__ */ jsx("option", { value: "media", children: "Media" }),
            /* @__PURE__ */ jsx("option", { value: "alta", children: "Alta" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full mt-4", children: /* @__PURE__ */ jsx(TimeInput, { id: "dueDate", label: "Fecha de vencimiento:", onChange: setDueDate }) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mt-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "assignedUserId", className: "block mb-2 text-sm font-semibold", children: "Asignar a:" }),
          /* @__PURE__ */ jsxs("select", { id: "assignedUserId", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", value: assignedUserId, onChange: (e) => setAssignedUserId(e.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Seleccione un miembro" }),
            members.map((member) => /* @__PURE__ */ jsx("option", { value: member.user_id, children: member.name }, member.user_id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3 justify-end items-center mt-4", children: [
          /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-blue-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300", children: "Guardar" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(false), type: "button", className: "bg-red-700 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300", children: "Cerrar" })
        ] })
      ] })
    ] }) })
  ] });
};

function ShareCourseModal({ inviteCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const copyToClipboard = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      toast.success("Codigo copiado al portapapeles");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-left", richColors: true }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: openModal,
        type: "button",
        className: "text-gray-900 flex justify-center items-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2.5 text-centeritems-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-4 h-4 ",
            "aria-hidden": "true",
            fill: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", { d: "M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z" })
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        id: "course-modal",
        className: "fixed inset-0 bg-gray-400 bg-opacity-30 flex overflow-y-auto h-full w-full z-50 justify-end  md:inset-0  max-h-full",
        children: /* @__PURE__ */ jsx("div", { className: "relative  p-4 w-full max-w-lg max-h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative top-40  bg-white rounded-lg shadow-lg shadow-blue-500 dark:shadow-purple-500 dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 md:p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg text-gray-500 dark:text-gray-400", children: "Compartir codigo de Proyecto" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: closeModal,
                className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white",
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-3 h-3",
                    "aria-hidden": "true",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 14 14",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        stroke: "currentColor",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      }
                    )
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 pb-4 md:px-5 md:pb-5", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "course-url",
                className: "text-sm font-medium text-gray-900 dark:text-white mb-2 block",
                children: "Codigo de invitación"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: inviteCode,
                  className: "col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  disabled: true,
                  readOnly: true
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: copyToClipboard,
                  className: "absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-3.5 h-3.5",
                      "aria-hidden": "true",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "currentColor",
                      viewBox: "0 0 18 20",
                      children: /* @__PURE__ */ jsx("path", { d: "M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: closeModal,
                type: "button",
                className: "py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
                children: "Cerrar"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}

const ProjectUsersDropdown = ({ projectId, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      const fetchedMembers = await getMembersByIdProject(projectId, token);
      for (let member of fetchedMembers) {
        const image = await getImageById(member.image, token);
        member.image = image.url;
      }
      setMembers(fetchedMembers);
    };
    fetchMembers();
  }, [projectId, token]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: toggleDropdown,
        type: "button",
        className: "text-gray-900 flex justify-center items-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1.5 text-centeritems-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
        children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 64 64", className: "w-6", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M14 17c3.309 0 6 2.916 6 6.5S17.309 30 14 30s-6-2.916-6-6.5S10.691 17 14 17zM23.246 36.071c-3.464 1.535-6.377 3.921-8.34 6.929H5.585c-1.344 0-2.754-1.135-2.57-2.812C3.521 35.521 8.244 32 14 32 17.876 32 21.278 33.602 23.246 36.071zM60.985 40.181C61.168 41.858 59.749 43 58.409 43c-2.079 0-8.315 0-8.315 0-2.101-3.219-5.288-5.732-9.074-7.245C43.019 33.467 46.291 32 50 32 55.751 32 60.479 35.516 60.985 40.181zM50 17c3.309 0 6 2.916 6 6.5S53.309 30 50 30s-6-2.916-6-6.5S46.691 17 50 17zM47.565 46.613C49.05 49.695 46.597 53 43.431 53c-5.465 0-16.396 0-21.861 0-3.006 0-5.691-3.156-4.135-6.387 2.48-5.15 8.394-8.477 15.065-8.477S45.085 41.463 47.565 46.613zM32 19c4.411 0 8 3.813 8 8.5S36.411 36 32 36s-8-3.813-8-8.5S27.589 19 32 19z" }) })
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "z-10 bg-white rounded-lg shadow-lg shadow-blue-500 dark:shadow-purple-500  dark:bg-gray-900 absolute top-40 right-8 mt-2", children: /* @__PURE__ */ jsx("ul", { className: " py-2 overflow-y-auto text-gray-700 dark:text-gray-200", children: members.map((member) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "#",
        className: "flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-10 h-10 mr-2 rounded-full",
              src: member.image,
              alt: member.name
            }
          ),
          member.name
        ]
      }
    ) }, member.user_id)) }) })
  ] });
};

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const email = Astro2.cookies.get("email")?.value;
  const token = Astro2.cookies.get("token")?.value;
  if (!email || !token) {
    return Astro2.redirect("/dashboard");
  }
  const user = await getUserByEmail(email, token);
  const data = {
    user_id: user.user_id,
    project_id: id
  };
  const member = await CheckMember(data, token);
  if (!member) {
    return Astro2.redirect("/dashboard");
  }
  const project = await getProjectById(id, token);
  const image = await getImageById(project.image, token);
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "authorization": true, "title": "Proyecto", "data-astro-cid-fjdbtobr": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dark:bg-gray-800 flex items-center justify-between bg-white rounded-lg" data-astro-cid-fjdbtobr> <p class="text-3xl text-blue-500 font-bold dark:text-purple-500" data-astro-cid-fjdbtobr> ${project.name} </p> <div class="flex gap-4 items-center p-2 bg-purple-300 rounded" data-astro-cid-fjdbtobr> ${renderComponent($$result2, "ShareCourseModal", ShareCourseModal, { "client:idle": true, "inviteCode": project.invite_code, "client:component-hydration": "idle", "client:component-path": "components/CopyInput", "client:component-export": "default", "data-astro-cid-fjdbtobr": true })} ${renderComponent($$result2, "ProjectUsersDropdown", ProjectUsersDropdown, { "client:idle": true, "projectId": project.project_id, "token": token, "client:component-hydration": "idle", "client:component-path": "components/ModalMembersProject", "client:component-export": "default", "data-astro-cid-fjdbtobr": true })} </div> </div> <div class="my-3 flex gap-2" data-astro-cid-fjdbtobr> <h3 class="text-2xl font-bold text-white py-1 px-2 bg-purple-500 rounded-lg max-w-60" data-astro-cid-fjdbtobr>
Tareas del proyecto
</h3> ${renderComponent($$result2, "FormNewTask", FormNewTask, { "project_id": project.project_id, "token": token, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "components/FormNewTask", "client:component-export": "default", "data-astro-cid-fjdbtobr": true })} </div> <div id="contenedor-tasks " class="rounded-lg min-h-96 mt-5 "${addAttribute({
    backgroundImage: `url(${image.url})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }, "style")} data-astro-cid-fjdbtobr> ${renderComponent($$result2, "TaskTabler", null, { "project_id": project.project_id, "token": token, "client:only": "react", "client:component-hydration": "only", "data-astro-cid-fjdbtobr": true, "client:component-path": "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/TaskTabler", "client:component-export": "default" })} </div> ` })} `;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/[id].astro", void 0);

const $$file = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/[id].astro";
const $$url = "/dashboard/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _id_ as _, getTasksListIdUser as a, getProjectById as b, createProject as c, deleteProject as d, getListProjectsByIdUser as g, joinProject as j };

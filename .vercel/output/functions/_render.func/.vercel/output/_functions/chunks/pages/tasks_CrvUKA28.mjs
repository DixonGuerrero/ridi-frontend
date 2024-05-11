/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, g as renderComponent } from '../astro_COR_oCTK.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as getUserByEmail, b as $$Boton, $ as $$Dashboard } from './404_C3vtIQYv.mjs';
import 'clsx';
import { a as getTasksListIdUser, b as getProjectById } from './_id__DxRNB3TT.mjs';

const $$Astro$2 = createAstro();
const $$ArrowRight = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ArrowRight;
  const { color } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg width="24" height="24" viewBox="0 0 24 24" fill="white"${addAttribute(color, "stroke")} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l14 0"></path><path d="M15 16l4 -4"></path><path d="M15 8l4 4"></path></svg>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/public/icons/arrowRight.astro", void 0);

const $$Astro$1 = createAstro();
const $$TasksList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TasksList;
  const email = Astro2.cookies.get("email")?.value;
  const token = Astro2.cookies.get("token")?.value;
  const user = await getUserByEmail(email, token);
  const tasks = await getTasksListIdUser(user.user_id, token);
  const tasksWithProjects = await Promise.all(tasks.map(async (task) => {
    const project = await getProjectById(task.project_id, token);
    return { ...task, projectName: project.name };
  }));
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-5 my-5 flex-wrap justify-center"> ${tasksWithProjects.map((task) => renderTemplate`<div class="flex-grow min-w-80 max-w-96 p-2 bg-blue-400 dark:bg-purple-400 rounded-lg"> <div class="flex w-full flex-row justify-between"> <h4 class="text-white text-xl font-bold">${task.name}</h4> <p class="font-raleway text-white font-bold">${task.due_date}</p> </div> <p class="font-bold text-lg text-blue-100 mt-3">${task.projectName}</p> <div class="flex justify-end p-3"> ${renderComponent($$result, "Boton", $$Boton, { "direccion": `${task.project_id}`, "texto": "Ver", "estilos": "bg-blue-500 px-5 py-2.5 text-white" }, { "after": ($$result2) => renderTemplate`${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "slot": "after", "color": "white" }, { "default": ($$result3) => renderTemplate`Ver` })}` })} </div> </div>`)} </div>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/TasksList.astro", void 0);

const $$Astro = createAstro();
const $$Tasks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tasks;
  const token = Astro2.cookies.get("token")?.value;
  if (token === void 0) {
    return Astro2.redirect("/dashboard");
  }
  const autorizado = true;
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "authorization": autorizado, "title": "Tareas Pendientes" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2 class="text-2xl font-bold dark:text-purple-400 text-blue-500 ">Mis tareas</h2> ${renderComponent($$result2, "TasksList", $$TasksList, {})} ` })}`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/tasks.astro", void 0);

const $$file = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/tasks.astro";
const $$url = "/dashboard/tasks";

export { $$Tasks as default, $$file as file, $$url as url };

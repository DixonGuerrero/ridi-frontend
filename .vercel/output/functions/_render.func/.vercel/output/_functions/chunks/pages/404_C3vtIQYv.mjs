/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot, g as renderComponent, h as renderHead } from '../astro_COR_oCTK.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */
/* empty css                        */

const $$Astro$4 = createAstro();
const $$Boton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Boton;
  const { texto, direccion, tipo, estilos } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(direccion, "href")}${addAttribute(tipo, "type")}${addAttribute(`flex justify-start items-center  hover:bg-gradient-to-br  font-bold rounded-lg  text-center  ${estilos}`, "class")} href="/"> ${renderSlot($$result, $$slots["before"])} ${texto} ${renderSlot($$result, $$slots["after"])} </a>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/Boton.astro", void 0);

const $$Astro$3 = createAstro();
const $$Bell = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Bell;
  const { estilos } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"${addAttribute(`icon icon-tabler icons-tabler-filled icon-tabler-bell ${estilos}`, "class")}><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"></path><path d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"></path></svg>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/public/icons/bell.astro", void 0);

const $$Astro$2 = createAstro();
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Settings;
  const { estilos } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"${addAttribute(`icon icon-tabler icons-tabler-filled icon-tabler-settings ${estilos}`, "class")}><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14.647 4.081a.724 .724 0 0 0 1.08 .448c2.439 -1.485 5.23 1.305 3.745 3.744a.724 .724 0 0 0 .447 1.08c2.775 .673 2.775 4.62 0 5.294a.724 .724 0 0 0 -.448 1.08c1.485 2.439 -1.305 5.23 -3.744 3.745a.724 .724 0 0 0 -1.08 .447c-.673 2.775 -4.62 2.775 -5.294 0a.724 .724 0 0 0 -1.08 -.448c-2.439 1.485 -5.23 -1.305 -3.745 -3.744a.724 .724 0 0 0 -.447 -1.08c-2.775 -.673 -2.775 -4.62 0 -5.294a.724 .724 0 0 0 .448 -1.08c-1.485 -2.439 1.305 -5.23 3.744 -3.745a.722 .722 0 0 0 1.08 -.447c.673 -2.775 4.62 -2.775 5.294 0zm-2.647 4.919a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"></path></svg>`;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/public/icons/settings.astro", void 0);

const apiUrl$1 = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";
const getUserByEmail = async (email, token) => {
  const response = await fetch(`${apiUrl$1}useremail/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const user = await response.json();
  console.log(user);
  return user.user;
};

const apiUrl = "https://ridi-backend.dixonguerrero1204.workers.dev/api/";
const getImageById = async (id, token) => {
  const response = await fetch(`${apiUrl}images/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const image = await response.json();
  return image.images;
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const { title, authorization } = Astro2.props;
  let user;
  if (authorization) {
    const email = Astro2.cookies.get("email")?.value;
    const token = Astro2.cookies.get("token")?.value;
    user = await getUserByEmail(email, token);
    const imagen = await getImageById(user.image, token);
    user.image = imagen.url;
  }
  const url = Astro2.url.pathname.split("/");
  const pagina = url[url.length - 1];
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-flaloh7p> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><link rel="icon" type="image/svg+xml" href="../../public/images/logo.webp">', '</head> <body class="bg-gray-200 dark:bg-gray-900 h-screen w-full p-2.5 transition-colors duration-300" data-astro-cid-flaloh7p> <div data-astro-cid-flaloh7p></div> <div class="menu fixed w-12 h-12 text-3xl flex justify-center items-center rounded-full bg-black dark:bg-white text-white dark:text-black right-4 top-4 z-40 sm:hidden" data-astro-cid-flaloh7p> ', " ", ' </div> <div class="barra-lateral shadow-lg rounded-lg flex flex-col justify-between w-60 overflow-hidden px-[15px] py-5 bg-white dark:bg-purple-700 z-50 sm:left-3 fixed left-[-250px]" data-astro-cid-flaloh7p> <div data-astro-cid-flaloh7p> <div class="nombre-pagina w-full h-11 text-black dark:text-white flex items-center" data-astro-cid-flaloh7p> <div class="flex gap-2" data-astro-cid-flaloh7p> <img id="logo"', ' class="rounded-full w-12 h-12" alt="" data-astro-cid-flaloh7p> <div class="" data-astro-cid-flaloh7p> <div class="flex flex-col" data-astro-cid-flaloh7p> <span class="font-bold" data-astro-cid-flaloh7p>', '</span> <span class="text-[10px] text-blue-300 dark:text-blue-100" data-astro-cid-flaloh7p>', '</span> </div> </div> </div> </div> </div> <nav class="navegacion overflow-y-auto overflow-x-hidden min-h-60" data-astro-cid-flaloh7p> <p class="text-sm text-gray-400 dark:text-gray-300 my-4" data-astro-cid-flaloh7p>P\xE1ginas</p> <ul data-astro-cid-flaloh7p> <li class="flex mb-1" data-astro-cid-flaloh7p> <a', ' href="/dashboard" class="text-gray-500 dark:text-gray-300 rounded-lg w-full h-11 flex items-center hover:bg-blue-300 dark:hover:bg-blue-500 hover:text-white" data-astro-cid-flaloh7p> ', ' <span data-astro-cid-flaloh7p>Principal</span> </a> </li> <li class="flex mb-1" data-astro-cid-flaloh7p> <a id="" href="#" class="text-gray-500 dark:text-gray-300 rounded-lg w-full h-11 flex items-center hover:bg-blue-300 dark:hover:bg-blue-500 hover:text-white" data-astro-cid-flaloh7p> ', ' <span data-astro-cid-flaloh7p>Calendario</span> </a> </li> <li class="flex mb-1" data-astro-cid-flaloh7p> <a', ' href="/dashboard/tasks" class="text-gray-500 dark:text-gray-300 rounded-lg w-full h-11 flex items-center hover:bg-blue-300 dark:hover:bg-blue-500 hover:text-white" data-astro-cid-flaloh7p> ', ' <span data-astro-cid-flaloh7p>Mis tareas</span> </a> </li> </ul> </nav> <div data-astro-cid-flaloh7p> <div class="w-full h-[1px] mt-4 bg-blue-500 dark:bg-purple-500" data-astro-cid-flaloh7p></div> <div class="modo-oscuro w-full rounded-lg flex justify-between items-center" data-astro-cid-flaloh7p> <div class="info w-40 h-11 overflow-hidden flex items-center text-gray-500 dark:text-gray-300 gap-2" data-astro-cid-flaloh7p> ', ' <span id="texto-Tema" data-astro-cid-flaloh7p>Modo oscuro</span> </div> <div class="switch flex items-center justify-center min-w-[50px] h-11 cursor-pointer" data-astro-cid-flaloh7p> <div class="base relative flex items-center w-9 h-5 bg-gray-400 dark:bg-purple-500 rounded-4xl" data-astro-cid-flaloh7p> <div class="circulo absolute w-[18px] h-[90%] bg-white rounded-full left-[2px] transition-all duration-500 ease-in-out" id="dark-mode-toggle" data-astro-cid-flaloh7p></div> </div> </div> </div> </div> </div> <main class="sm:ml-64 ml-0" data-astro-cid-flaloh7p> <nav class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 flex justify-between items-center" data-astro-cid-flaloh7p> <p class="text-2xl font-bold text-gray-900 dark:text-white" data-astro-cid-flaloh7p>\nBienvenido a RIDI\n</p> <div class="flex gap-4 items-center" data-astro-cid-flaloh7p> <!-- Botones y otros elementos aqu\xED --> ', " ", ' </div> </nav> <!-- Contenido principal aqu\xED --> <div class="flex-1 p-4 bg-white shadow-lg rounded-lg mt-3 dark:bg-gray-800" data-astro-cid-flaloh7p> ', ' </div> </main> <!--     <main class="sm:ml-64 ml-0 ">\n\n      <div class="flex-1 flex flex-col">\n        <nav\n          class="flex p-5 items-center justify-between bg-white shadow-lg rounded-lg"\n        >\n          <p class="text-2xl font-bold">Bienvenido a RIDI</p>\n          <div class="flex gap-4 items-center">\n           \n          </div>\n        </nav>\n\n\n       \n      </div>\n    </main> --> <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"><\/script> <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"><\/script>  </body> </html> '])), title, renderHead(), renderComponent($$result, "ion-icon", "ion-icon", { "name": "menu-outline", "data-astro-cid-flaloh7p": true }), renderComponent($$result, "ion-icon", "ion-icon", { "name": "close-outline", "class": "hidden", "data-astro-cid-flaloh7p": true }), addAttribute(user?.image, "src"), !user ? "Generico" : user.name, !user ? "Generico" : user.email, addAttribute(pagina == "dashboard" ? "inbox" : "", "id"), renderComponent($$result, "ion-icon", "ion-icon", { "class": "min-w-[50px] text-[20px]", "name": "home", "data-astro-cid-flaloh7p": true }), renderComponent($$result, "ion-icon", "ion-icon", { "class": "min-w-[50px] text-[20px]", "name": "calendar-number", "data-astro-cid-flaloh7p": true }), addAttribute(pagina == "tasks" ? "inbox" : "", "id"), renderComponent($$result, "ion-icon", "ion-icon", { "class": "min-w-[50px] text-[20px]", "name": "reader", "data-astro-cid-flaloh7p": true }), renderComponent($$result, "ion-icon", "ion-icon", { "id": "iconTema", "name": "cloudy-night", "data-astro-cid-flaloh7p": true }), renderComponent($$result, "Boton", $$Boton, { "direccion": "#", "estilos": "items-center", "data-astro-cid-flaloh7p": true }, { "before": ($$result2) => renderTemplate`${renderComponent($$result2, "BellIcon", $$Bell, { "slot": "before", "estilos": "text-gray-500", "data-astro-cid-flaloh7p": true })}` }), renderComponent($$result, "Boton", $$Boton, { "direccion": "/dashboard/settings", "data-astro-cid-flaloh7p": true }, { "before": ($$result2) => renderTemplate`${renderComponent($$result2, "SettingsIcon", $$Settings, { "slot": "before", "estilos": `text-gray-500 ${pagina == "settings" ? "rounded-lg ring-4 foutline-none ring-blue-300 " : ""}`, "data-astro-cid-flaloh7p": true })}` }), renderSlot($$result, $$slots["default"]));
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/layouts/Dashboard.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const token = Astro2.cookies.get("token")?.value;
  Astro2.cookies.get("email")?.value;
  if (!token) {
    return Astro2.redirect("/");
  }
  const authorization = true;
  return renderTemplate`${renderComponent($$result, "Dashboard", $$Dashboard, { "authorization": authorization, "title": "404 Not Found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="dark:bg-gray-600 bg-gray-100  rounded-lg " data-astro-cid-zetdm5md> <div class="flex flex-col justify-center items-center" data-astro-cid-zetdm5md> <h1 class="text-white text-3xl text-center" data-astro-cid-zetdm5md>Esta pagina no existe...</h1> <img src="https://midu.dev/images/this-is-fine-404.gif" class="rounded" data-astro-cid-zetdm5md> </div> </main> ` })} `;
}, "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/404.astro", void 0);

const $$file = "C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$404,
   file: $$file,
   url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Dashboard as $, _404 as _, getUserByEmail as a, $$Boton as b, getImageById as g };

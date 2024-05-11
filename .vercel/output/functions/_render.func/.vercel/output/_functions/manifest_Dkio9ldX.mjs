import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_COR_oCTK.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const s=document.getElementById(\"logo\"),n=document.querySelector(\".barra-lateral\"),r=document.querySelectorAll(\"span\"),i=document.querySelector(\".switch\"),o=document.querySelector(\".circulo\"),t=document.querySelector(\".menu\"),l=document.querySelector(\"main\"),a=document.getElementById(\"texto-Tema\"),c=document.getElementById(\"iconTema\");t&&n&&l&&o&&i?(t.addEventListener(\"click\",()=>{n.classList.toggle(\"max-barra-lateral\"),n.classList.contains(\"max-barra-lateral\")?t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: none\"),t.children[1].setAttribute(\"style\",\"display: block\")):t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: block\"),t.children[1].setAttribute(\"style\",\"display: none\")),window.innerWidth<=320&&(n.classList.add(\"mini-barra-lateral\"),l.classList.add(\"min-main\"),r.forEach(e=>{e.classList.add(\"oculto\")}))}),i.addEventListener(\"click\",()=>{const e=document.documentElement.classList.contains(\"dark\");d(!e)}),s&&s.addEventListener(\"click\",()=>{n.classList.toggle(\"mini-barra-lateral\"),l.classList.toggle(\"min-main\"),r.forEach(e=>{e.classList.toggle(\"oculto\")})})):console.error(\"Some elements were not found in the DOM.\");function m(){const e=localStorage.getItem(\"darkMode\");d(e===\"true\")}function d(e){if(!o||!a||!c)return null;e?(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"darkMode\",\"true\"),o.classList.add(\"prendido\"),a.textContent=\"Modo Claro\",c.setAttribute(\"name\",\"sunny\")):(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"darkMode\",\"false\"),o.classList.remove(\"prendido\"),a.textContent=\"Modo oscuro\",c.setAttribute(\"name\",\"cloudy-night\"))}m();\n"}],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":"main[data-astro-cid-zetdm5md]{height:100vh;background-color:#1a1919}h1[data-astro-cid-zetdm5md]{margin:2rem;font-size:40px}\n.barra-lateral[data-astro-cid-flaloh7p]{transition:width .5s ease,background-color .3s ease,left .5s ease}.mini-barra-lateral[data-astro-cid-flaloh7p]{width:80px}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p]{width:100px;white-space:nowrap;text-align:left;opacity:1;transition:opacity .5s ease,width .5s ease}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p].oculto{opacity:0;display:none}#inbox[data-astro-cid-flaloh7p]{background-color:#5771f7;color:#fff}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar{width:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb{background-color:#4c8bf0;border-radius:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb:hover{background-color:#2f77ea}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p]{transition:left .5s ease}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p].prendido{left:15px}main[data-astro-cid-flaloh7p]{transition:margin-left .5s ease}main[data-astro-cid-flaloh7p].min-main{margin-left:90px}@media (max-width: 600px){.max-barra-lateral[data-astro-cid-flaloh7p]{left:0}.menu[data-astro-cid-flaloh7p] ion-icon[data-astro-cid-flaloh7p]:nth-child(2){display:none}main[data-astro-cid-flaloh7p].min-main{margin-left:0}}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const s=document.getElementById(\"logo\"),n=document.querySelector(\".barra-lateral\"),r=document.querySelectorAll(\"span\"),i=document.querySelector(\".switch\"),o=document.querySelector(\".circulo\"),t=document.querySelector(\".menu\"),l=document.querySelector(\"main\"),a=document.getElementById(\"texto-Tema\"),c=document.getElementById(\"iconTema\");t&&n&&l&&o&&i?(t.addEventListener(\"click\",()=>{n.classList.toggle(\"max-barra-lateral\"),n.classList.contains(\"max-barra-lateral\")?t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: none\"),t.children[1].setAttribute(\"style\",\"display: block\")):t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: block\"),t.children[1].setAttribute(\"style\",\"display: none\")),window.innerWidth<=320&&(n.classList.add(\"mini-barra-lateral\"),l.classList.add(\"min-main\"),r.forEach(e=>{e.classList.add(\"oculto\")}))}),i.addEventListener(\"click\",()=>{const e=document.documentElement.classList.contains(\"dark\");d(!e)}),s&&s.addEventListener(\"click\",()=>{n.classList.toggle(\"mini-barra-lateral\"),l.classList.toggle(\"min-main\"),r.forEach(e=>{e.classList.toggle(\"oculto\")})})):console.error(\"Some elements were not found in the DOM.\");function m(){const e=localStorage.getItem(\"darkMode\");d(e===\"true\")}function d(e){if(!o||!a||!c)return null;e?(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"darkMode\",\"true\"),o.classList.add(\"prendido\"),a.textContent=\"Modo Claro\",c.setAttribute(\"name\",\"sunny\")):(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"darkMode\",\"false\"),o.classList.remove(\"prendido\"),a.textContent=\"Modo oscuro\",c.setAttribute(\"name\",\"cloudy-night\"))}m();\n"}],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":".barra-lateral[data-astro-cid-flaloh7p]{transition:width .5s ease,background-color .3s ease,left .5s ease}.mini-barra-lateral[data-astro-cid-flaloh7p]{width:80px}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p]{width:100px;white-space:nowrap;text-align:left;opacity:1;transition:opacity .5s ease,width .5s ease}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p].oculto{opacity:0;display:none}#inbox[data-astro-cid-flaloh7p]{background-color:#5771f7;color:#fff}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar{width:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb{background-color:#4c8bf0;border-radius:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb:hover{background-color:#2f77ea}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p]{transition:left .5s ease}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p].prendido{left:15px}main[data-astro-cid-flaloh7p]{transition:margin-left .5s ease}main[data-astro-cid-flaloh7p].min-main{margin-left:90px}@media (max-width: 600px){.max-barra-lateral[data-astro-cid-flaloh7p]{left:0}.menu[data-astro-cid-flaloh7p] ion-icon[data-astro-cid-flaloh7p]:nth-child(2){display:none}main[data-astro-cid-flaloh7p].min-main{margin-left:0}}\n"}],"routeData":{"route":"/dashboard/settings","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/settings\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/settings.astro","pathname":"/dashboard/settings","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const s=document.getElementById(\"logo\"),n=document.querySelector(\".barra-lateral\"),r=document.querySelectorAll(\"span\"),i=document.querySelector(\".switch\"),o=document.querySelector(\".circulo\"),t=document.querySelector(\".menu\"),l=document.querySelector(\"main\"),a=document.getElementById(\"texto-Tema\"),c=document.getElementById(\"iconTema\");t&&n&&l&&o&&i?(t.addEventListener(\"click\",()=>{n.classList.toggle(\"max-barra-lateral\"),n.classList.contains(\"max-barra-lateral\")?t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: none\"),t.children[1].setAttribute(\"style\",\"display: block\")):t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: block\"),t.children[1].setAttribute(\"style\",\"display: none\")),window.innerWidth<=320&&(n.classList.add(\"mini-barra-lateral\"),l.classList.add(\"min-main\"),r.forEach(e=>{e.classList.add(\"oculto\")}))}),i.addEventListener(\"click\",()=>{const e=document.documentElement.classList.contains(\"dark\");d(!e)}),s&&s.addEventListener(\"click\",()=>{n.classList.toggle(\"mini-barra-lateral\"),l.classList.toggle(\"min-main\"),r.forEach(e=>{e.classList.toggle(\"oculto\")})})):console.error(\"Some elements were not found in the DOM.\");function m(){const e=localStorage.getItem(\"darkMode\");d(e===\"true\")}function d(e){if(!o||!a||!c)return null;e?(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"darkMode\",\"true\"),o.classList.add(\"prendido\"),a.textContent=\"Modo Claro\",c.setAttribute(\"name\",\"sunny\")):(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"darkMode\",\"false\"),o.classList.remove(\"prendido\"),a.textContent=\"Modo oscuro\",c.setAttribute(\"name\",\"cloudy-night\"))}m();\n"}],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":".barra-lateral[data-astro-cid-flaloh7p]{transition:width .5s ease,background-color .3s ease,left .5s ease}.mini-barra-lateral[data-astro-cid-flaloh7p]{width:80px}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p]{width:100px;white-space:nowrap;text-align:left;opacity:1;transition:opacity .5s ease,width .5s ease}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p].oculto{opacity:0;display:none}#inbox[data-astro-cid-flaloh7p]{background-color:#5771f7;color:#fff}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar{width:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb{background-color:#4c8bf0;border-radius:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb:hover{background-color:#2f77ea}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p]{transition:left .5s ease}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p].prendido{left:15px}main[data-astro-cid-flaloh7p]{transition:margin-left .5s ease}main[data-astro-cid-flaloh7p].min-main{margin-left:90px}@media (max-width: 600px){.max-barra-lateral[data-astro-cid-flaloh7p]{left:0}.menu[data-astro-cid-flaloh7p] ion-icon[data-astro-cid-flaloh7p]:nth-child(2){display:none}main[data-astro-cid-flaloh7p].min-main{margin-left:0}}\n"}],"routeData":{"route":"/dashboard/tasks","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/tasks\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"tasks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/tasks.astro","pathname":"/dashboard/tasks","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const s=document.getElementById(\"logo\"),n=document.querySelector(\".barra-lateral\"),r=document.querySelectorAll(\"span\"),i=document.querySelector(\".switch\"),o=document.querySelector(\".circulo\"),t=document.querySelector(\".menu\"),l=document.querySelector(\"main\"),a=document.getElementById(\"texto-Tema\"),c=document.getElementById(\"iconTema\");t&&n&&l&&o&&i?(t.addEventListener(\"click\",()=>{n.classList.toggle(\"max-barra-lateral\"),n.classList.contains(\"max-barra-lateral\")?t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: none\"),t.children[1].setAttribute(\"style\",\"display: block\")):t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: block\"),t.children[1].setAttribute(\"style\",\"display: none\")),window.innerWidth<=320&&(n.classList.add(\"mini-barra-lateral\"),l.classList.add(\"min-main\"),r.forEach(e=>{e.classList.add(\"oculto\")}))}),i.addEventListener(\"click\",()=>{const e=document.documentElement.classList.contains(\"dark\");d(!e)}),s&&s.addEventListener(\"click\",()=>{n.classList.toggle(\"mini-barra-lateral\"),l.classList.toggle(\"min-main\"),r.forEach(e=>{e.classList.toggle(\"oculto\")})})):console.error(\"Some elements were not found in the DOM.\");function m(){const e=localStorage.getItem(\"darkMode\");d(e===\"true\")}function d(e){if(!o||!a||!c)return null;e?(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"darkMode\",\"true\"),o.classList.add(\"prendido\"),a.textContent=\"Modo Claro\",c.setAttribute(\"name\",\"sunny\")):(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"darkMode\",\"false\"),o.classList.remove(\"prendido\"),a.textContent=\"Modo oscuro\",c.setAttribute(\"name\",\"cloudy-night\"))}m();\n"}],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":".barra-lateral[data-astro-cid-flaloh7p]{transition:width .5s ease,background-color .3s ease,left .5s ease}.mini-barra-lateral[data-astro-cid-flaloh7p]{width:80px}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p]{width:100px;white-space:nowrap;text-align:left;opacity:1;transition:opacity .5s ease,width .5s ease}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p].oculto{opacity:0;display:none}#inbox[data-astro-cid-flaloh7p]{background-color:#5771f7;color:#fff}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar{width:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb{background-color:#4c8bf0;border-radius:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb:hover{background-color:#2f77ea}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p]{transition:left .5s ease}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p].prendido{left:15px}main[data-astro-cid-flaloh7p]{transition:margin-left .5s ease}main[data-astro-cid-flaloh7p].min-main{margin-left:90px}@media (max-width: 600px){.max-barra-lateral[data-astro-cid-flaloh7p]{left:0}.menu[data-astro-cid-flaloh7p] ion-icon[data-astro-cid-flaloh7p]:nth-child(2){display:none}main[data-astro-cid-flaloh7p].min-main{margin-left:0}}\n"}],"routeData":{"route":"/dashboard/[id]","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/([^/]+?)\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/dashboard/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const s=document.getElementById(\"logo\"),n=document.querySelector(\".barra-lateral\"),r=document.querySelectorAll(\"span\"),i=document.querySelector(\".switch\"),o=document.querySelector(\".circulo\"),t=document.querySelector(\".menu\"),l=document.querySelector(\"main\"),a=document.getElementById(\"texto-Tema\"),c=document.getElementById(\"iconTema\");t&&n&&l&&o&&i?(t.addEventListener(\"click\",()=>{n.classList.toggle(\"max-barra-lateral\"),n.classList.contains(\"max-barra-lateral\")?t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: none\"),t.children[1].setAttribute(\"style\",\"display: block\")):t.children.length>1&&(t.children[0].setAttribute(\"style\",\"display: block\"),t.children[1].setAttribute(\"style\",\"display: none\")),window.innerWidth<=320&&(n.classList.add(\"mini-barra-lateral\"),l.classList.add(\"min-main\"),r.forEach(e=>{e.classList.add(\"oculto\")}))}),i.addEventListener(\"click\",()=>{const e=document.documentElement.classList.contains(\"dark\");d(!e)}),s&&s.addEventListener(\"click\",()=>{n.classList.toggle(\"mini-barra-lateral\"),l.classList.toggle(\"min-main\"),r.forEach(e=>{e.classList.toggle(\"oculto\")})})):console.error(\"Some elements were not found in the DOM.\");function m(){const e=localStorage.getItem(\"darkMode\");d(e===\"true\")}function d(e){if(!o||!a||!c)return null;e?(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"darkMode\",\"true\"),o.classList.add(\"prendido\"),a.textContent=\"Modo Claro\",c.setAttribute(\"name\",\"sunny\")):(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"darkMode\",\"false\"),o.classList.remove(\"prendido\"),a.textContent=\"Modo oscuro\",c.setAttribute(\"name\",\"cloudy-night\"))}m();\n"}],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":".barra-lateral[data-astro-cid-flaloh7p]{transition:width .5s ease,background-color .3s ease,left .5s ease}.mini-barra-lateral[data-astro-cid-flaloh7p]{width:80px}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p]{width:100px;white-space:nowrap;text-align:left;opacity:1;transition:opacity .5s ease,width .5s ease}.barra-lateral[data-astro-cid-flaloh7p] span[data-astro-cid-flaloh7p].oculto{opacity:0;display:none}#inbox[data-astro-cid-flaloh7p]{background-color:#5771f7;color:#fff}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar{width:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb{background-color:#4c8bf0;border-radius:5px}.barra-lateral[data-astro-cid-flaloh7p] .navegacion[data-astro-cid-flaloh7p]::-webkit-scrollbar-thumb:hover{background-color:#2f77ea}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p]{transition:left .5s ease}.barra-lateral[data-astro-cid-flaloh7p] .modo-oscuro[data-astro-cid-flaloh7p] .circulo[data-astro-cid-flaloh7p].prendido{left:15px}main[data-astro-cid-flaloh7p]{transition:margin-left .5s ease}main[data-astro-cid-flaloh7p].min-main{margin-left:90px}@media (max-width: 600px){.max-barra-lateral[data-astro-cid-flaloh7p]{left:0}.menu[data-astro-cid-flaloh7p] ion-icon[data-astro-cid-flaloh7p]:nth-child(2){display:none}main[data-astro-cid-flaloh7p].min-main{margin-left:0}}\n"}],"routeData":{"route":"/dashboard","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/index.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":":root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}\nmain[data-astro-cid-sgpqyurt]{background-image:linear-gradient(-20deg,#b721ff,#21d4fd)}div[data-astro-cid-sgpqyurt]{background-color:#ffffff1a}\n"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":":root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}\nmain[data-astro-cid-sgjovbj7]{display:flex;justify-content:center;align-items:center;height:100vh;background-image:linear-gradient(-20deg,#b721ff,#21d4fd)}div[data-astro-cid-sgjovbj7]{background-color:#ffffff1a}\n"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.BbjWTaty.css"},{"type":"inline","content":":root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}\nmain[data-astro-cid-j7pv25f6]{margin:auto;width:1000px;max-width:calc(100% - 2rem);color:#fff;font-size:20px;line-height:1.6}h1[data-astro-cid-j7pv25f6]{font-size:4rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/settings.astro",{"propagation":"none","containsHead":true}],["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/dashboard/tasks.astro",{"propagation":"none","containsHead":true}],["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/pages/signup.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_D3AbhjZl.mjs","/src/pages/dashboard/settings.astro":"chunks/pages/settings_BxWjjBpc.mjs","/src/pages/signup.astro":"chunks/pages/signup_FSyUeGMg.mjs","/src/pages/dashboard/tasks.astro":"chunks/pages/tasks_CrvUKA28.mjs","\u0000@astrojs-manifest":"manifest_Dkio9ldX.mjs","C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_Cf6WbfhG.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_DPxZ873-.mjs","\u0000@astro-page:src/pages/dashboard/settings@_@astro":"chunks/settings_BYQGu51Z.mjs","\u0000@astro-page:src/pages/dashboard/tasks@_@astro":"chunks/tasks_D_wUT_xK.mjs","\u0000@astro-page:src/pages/dashboard/[id]@_@astro":"chunks/_id__BSobQD9_.mjs","\u0000@astro-page:src/pages/dashboard/index@_@astro":"chunks/index_B84f_Prj.mjs","\u0000@astro-page:src/pages/login@_@astro":"chunks/login_DwV-BryE.mjs","\u0000@astro-page:src/pages/signup@_@astro":"chunks/signup_mh1CLj_v.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_CsP345Be.mjs","components/UpdateImageUser":"_astro/UpdateImageUser.BMXKhnE9.js","components/FormJoinProyect":"_astro/FormJoinProyect.CpyD8s2G.js","C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/FormSignUp":"_astro/FormSignUp.qgbs2dP9.js","components/FormNewTask":"_astro/FormNewTask.Dec-C5Si.js","components/CopyInput":"_astro/CopyInput.DaIf7dd_.js","components/FormNewProject":"_astro/FormNewProject.BeZ3tmS1.js","@astrojs/svelte/client.js":"_astro/client.Cx1FBVJX.js","components/CloseSesion":"_astro/CloseSesion.CuwYxUtS.js","C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/TaskTabler":"_astro/TaskTabler.Dls3CHxZ.js","components/UpdateUser":"_astro/UpdateUser.DZu_IBsd.js","@astrojs/react/client.js":"_astro/client.Ci3iNkDi.js","C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/ProjectList":"_astro/ProjectList.CSjqARiP.js","C:/Users/dixon/Documents/U.caldas/Talleres/WEB1/Proyecto(SGP)/Proyecto-RIDI/FrontEnd/ridi-frontend/src/components/FormLogin":"_astro/FormLogin.nrChDTnY.js","/astro/hoisted.js?q=0":"_astro/hoisted.OymNz6Gy.js","components/ModalMembersProject":"_astro/ModalMembersProject.BxycvatM.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_id_.BbjWTaty.css","/images/1.jpg","/images/8.webp","/images/avatar.jpg","/images/Beneficio1.webp","/images/Beneficio2.webp","/images/Beneficio3.webp","/images/exampleProyect.jpg","/images/hero.gif","/images/logo.webp","/icons/arrowLeft.astro","/icons/arrowRight.astro","/icons/bell.astro","/icons/calendar.astro","/icons/create.astro","/icons/facebook.astro","/icons/group.astro","/icons/home.astro","/icons/instagram.astro","/icons/settings.astro","/icons/share.astro","/icons/sun.astro","/icons/task.astro","/icons/trash.astro","/icons/whatsapp.astro","/icons/x.astro","/_astro/Boton.DHVpEmXo.js","/_astro/client.Ci3iNkDi.js","/_astro/client.Cx1FBVJX.js","/_astro/CloseSesion.CuwYxUtS.js","/_astro/CopyInput.DaIf7dd_.js","/_astro/FormJoinProyect.CpyD8s2G.js","/_astro/FormLogin.nrChDTnY.js","/_astro/FormNewProject.BeZ3tmS1.js","/_astro/FormNewTask.Dec-C5Si.js","/_astro/FormSignUp.qgbs2dP9.js","/_astro/images.service.D1BH9aap.js","/_astro/index.CZlPm10g.js","/_astro/index.DAwUGNE3.js","/_astro/index.DOoKv-MU.js","/_astro/index.JOLg7cur.js","/_astro/jsx-runtime.D5qyYPMi.js","/_astro/members.service.D8_E1qik.js","/_astro/ModalMembersProject.BxycvatM.js","/_astro/project.store.BI1zDguh.js","/_astro/ProjectList.CSjqARiP.js","/_astro/sesion.service.BfAn-82Y.js","/_astro/tasks.store.d6dfpnp8.js","/_astro/TaskTabler.Dls3CHxZ.js","/_astro/UpdateImageUser.BMXKhnE9.js","/_astro/UpdateUser.DZu_IBsd.js"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };

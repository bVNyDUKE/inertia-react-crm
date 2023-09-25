import "../css/app.css";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/react";
import ZiggyRoute from "../../vendor/tightenco/ziggy/src/js";
import { Ziggy } from "./routes";
import Authenticated from "./Layouts/Authenticated";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

window.route = (name, params) => ZiggyRoute(name, params, false, Ziggy);

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  progress: {
    color: "#4B5563",
  },
  resolve: async (name) => {
    const { default: page } = await resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob("./Pages/**/*.jsx"));
    if (!name.startsWith("Auth/")) {
      page.layout = page.layout || Authenticated;
    }
    return page;
  },
  setup({ el, App, props }) {
    return render(<App {...props} />, el);
  },
});

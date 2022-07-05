import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";

import ZiggyRoute from "tightenco/ziggy/src/js";
import { Ziggy } from "./routes";
import Authenticated from "./Layouts/Authenticated";

window.route = (name, params) => ZiggyRoute(name, params, false, Ziggy);

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const page = require(`./Pages/${name}`).default;
    page.layout = page.layout || Authenticated;
    return page;
  },
  setup({ el, App, props }) {
    return render(<App {...props} />, el);
  },
});

InertiaProgress.init({ color: "#4B5563" });

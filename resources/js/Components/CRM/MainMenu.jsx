import { Link } from "@inertiajs/inertia-react";
import Icon from "@/Components/CRM/Icons";
import React from "react";

const MainMenu = () => {
  return (
    <div className="hidden flex-shrink-0 p-8 w-52 bg-indigo-800 overflow-y-auto md:block">
      <div className="mb-4">
        <Link className="group flex items-center py-3" href="/">
          <Icon.Dashboard className={`mr-2 w-4 h-4 ${route().current("dashboard") ? "fill-white" : "fill-indigo-400 group-hover:fill-white"}`} />
          <div className={route().current("dashboard") ? "text-white" : "text-indigo-300 group-hover:text-white"}>Dashboard</div>
        </Link>
      </div>
      <div className="mb-4">
        <Link className="group flex items-center py-3" href={route("clients.index")}>
          <Icon.Office className={`mr-2 w-4 h-4 ${route().current("clients.index") ? "fill-white" : "fill-indigo-400 group-hover:fill-white"}`} />
          <div className={route().current("clients.index") ? "text-white" : "text-indigo-300 group-hover:text-white"}>Clients</div>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;

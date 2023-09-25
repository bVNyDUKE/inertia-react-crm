import { Link } from "@inertiajs/react";
import Icon from "@/Components/Icons";

const MenuItem = ({ routeName, label, icon, href = null }) => {
  const ShownIcon = Icon[icon];
  return (
    <div className="mb-4">
      <Link className="group flex items-center py-3" href={href || route(routeName)}>
        <ShownIcon className={`mr-2 h-4 w-4 ${route().current(routeName) ? "fill-white" : "fill-indigo-400 group-hover:fill-white"}`} />
        <div className={route().current(routeName) ? "text-white" : "text-indigo-300 group-hover:text-white"}>{label}</div>
      </Link>
    </div>
  );
};

const MainMenu = () => {
  return (
    <div className="hidden w-56 flex-shrink-0 overflow-y-auto bg-indigo-800 p-12 md:block">
      <MenuItem routeName="dashboard" label="Dashboard" icon="Dashboard" href="/" />
      <MenuItem routeName={"clients.index"} label="Clients" icon="Office" />
      <MenuItem routeName={"projects.index"} label="Projects" icon="Printer" />
    </div>
  );
};

export default MainMenu;

import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Icon from "@/Components/Icons";

const ResponsiveMenu = () => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <>
      <div className="-mr-2 flex items-center md:hidden">
        <button
          onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
        >
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              className={showingNavigationDropdown ? "inline-flex" : "hidden"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className={(showingNavigationDropdown ? "block" : "hidden") + " flex flex-col justify-between md:hidden"}>
        <div className="flex-shrink-0 overflow-y-auto bg-indigo-800 p-4">
          <div className="mb-4">
            <Link className="group flex items-center py-3" href="/">
              <Icon.Dashboard className={`mr-2 h-4 w-4 ${route().current("dashboard") ? "fill-white" : "fill-indigo-400 group-hover:fill-white"}`} />
              <div className={route().current("dashboard") ? "text-white" : "text-indigo-300 group-hover:text-white"}>Dashboard</div>
            </Link>
          </div>
          <div className="mb-4">
            <Link className="group flex items-center py-3" href={route("clients.index")}>
              <Icon.Office className={`mr-2 h-4 w-4 ${route().current("clients.index") ? "fill-white" : "fill-indigo-400 group-hover:fill-white"}`} />
              <div className={route().current("clients.index") ? "text-white" : "text-indigo-300 group-hover:text-white"}>Clients</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;

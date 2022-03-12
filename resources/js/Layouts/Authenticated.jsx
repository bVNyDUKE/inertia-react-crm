import React from "react";
import ApplicationLogo from "@/Components/CRM/ApplicationLogo";
import ResponsiveMenu from "@/Components/CRM/ResponsiveMenu";
import MainMenu from "@/Components/CRM/MainMenu";
import UserDropdown from "@/Components/CRM/UserDropdown";

export default function Authenticated({ auth, header, children }) {
  return (
    <div>
      <div className="md:flex md:flex-col">
        <div className="md:flex md:flex-col md:h-screen">
          <div className="md:flex md:flex-shrink-0">
            <nav className="bg-indigo-800 border-r-2 p-2 space-y-5 lg:w-56 md:h-screen">
              <ApplicationLogo />
              <MainMenu />
              <ResponsiveMenu />
            </nav>

            <main className="grow bg-gray-100">
              {header && (
                <header className="bg-white border-b-2">
                  <div className="mx-auto py-3 px-4 flex justify-between items-center">
                    {header} <UserDropdown auth={auth} />
                  </div>
                </header>
              )}
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

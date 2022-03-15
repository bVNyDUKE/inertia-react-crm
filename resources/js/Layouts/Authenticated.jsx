import React from "react";
import ApplicationLogo from "@/Components/CRM/ApplicationLogo";
import ResponsiveMenu from "@/Components/CRM/ResponsiveMenu";
import MainMenu from "@/Components/CRM/MainMenu";
import UserDropdown from "@/Components/CRM/UserDropdown";

export default function Authenticated({ auth, header, children }) {
  return (
    <div className="md:flex md:flex-col">
      <div className="md:flex md:h-screen md:flex-col">
        <div className="md:flex md:flex-shrink-0">
          <nav className="space-y-5 border-r-2 bg-indigo-800 p-2 md:h-screen lg:w-56">
            <ApplicationLogo />
            <MainMenu />
            <ResponsiveMenu />
          </nav>

          <main className="grow bg-gray-100">
            {header && (
              <header className="border-b-2 bg-white">
                <div className="mx-auto flex items-center justify-between py-3 px-4">
                  {header} <UserDropdown auth={auth} />
                </div>
              </header>
            )}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

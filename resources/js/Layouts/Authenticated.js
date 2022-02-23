import React, { useState } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import XApplicationLogo from "@/Components/XApplicationLogo";
import XUserDropdown from "../Components/XUserDropdown";

export default function Authenticated({ auth, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <nav className="bg-white border-r-2 p-2 space-y-5 lg:w-72">
        <XApplicationLogo />
        <XUserDropdown auth={auth} />

        <div className="hidden w-full sm:flex">
          <ResponsiveNavLink
            href={route("dashboard")}
            active={route().current("dashboard")}
          >
            Dashboard
          </ResponsiveNavLink>
        </div>

        <div className="-mr-2 flex items-center sm:hidden">
          <button
            onClick={() =>
              setShowingNavigationDropdown((previousState) => !previousState)
            }
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className={
                  !showingNavigationDropdown ? "inline-flex" : "hidden"
                }
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

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") +
            " sm:hidden flex flex-col justify-between"
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("dashboard")}
              active={route().current("dashboard")}
            >
              Dashboard
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800">
                {auth.user.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {auth.user.email}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="grow">
        {header && (
          <header className="bg-white border-b-2">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}
        {children}
      </main>
    </div>
  );
}

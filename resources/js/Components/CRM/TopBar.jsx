import React from "react";
import ApplicationLogo from "@/Components/CRM/ApplicationLogo";
import UserDropdown from "@/Components/CRM/UserDropdown";

function TopBar() {
  return (
    <div className="md:flex md:flex-shrink-0">
      <ApplicationLogo />
      <div className="md:text-md flex w-full items-center justify-between border-b bg-white p-4 text-sm md:py-0 md:px-12">
        <div className="mt-1 mr-4">Acme Corporation</div> <UserDropdown />
      </div>
    </div>
  );
}

export default TopBar;

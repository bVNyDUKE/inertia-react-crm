import React from "react";
import TopBar from "@/Components/CRM/TopBar";
import MainMenu from "@/Components/CRM/MainMenu";
import { Head } from "@inertiajs/inertia-react";

export default function Authenticated({ children, title }) {
  return (
    <div className="md:flex md:flex-col">
      <Head title={title} />
      <div className="md:flex md:h-screen md:flex-col">
        <TopBar />
        <div className="md:flex md:flex-grow md:overflow-hidden">
          <MainMenu />
          <div className="px-4 py-8 md:flex-1 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import ApplicationLogo from "@/Components/Breeze/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function XApplicationLogo() {
  return (
    <div className="shrink-0 flex flex-col items-center mb-5 bg-indigo-800">
      <Link href="/">
        <ApplicationLogo className="block h-20 w-auto fill-white" />
      </Link>
    </div>
  );
}

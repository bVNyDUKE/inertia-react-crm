import React from "react";
import { Link } from "@inertiajs/inertia-react";

function Pagination({ links }) {
  console.log(links);
  return (
    <div className="ml-2 space-x-2">
      {links.links.map((link) => (
        <Link
          as="a"
          className={`inline-block mb-2 ${
            link.active && "text-blue-400 underline"
          }`}
          href={link.url}
          key={link.id}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}

export default Pagination;

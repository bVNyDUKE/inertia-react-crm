import React from "react";
import { Link } from "@inertiajs/inertia-react";

function Pagination({ paginator }) {
  const { from, to, links: allLinks, prev_page_url: previous, next_page_url: next, total } = paginator;

  const links = allLinks.filter((link) => !link.label.includes("Previous") && !link.label.includes("Next"));

  return (
    <div className="px-4 pb-2 flex items-center justify-between sm:px-6">
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium mx-1">{from}</span>
            to
            <span className="font-medium mx-1">{to}</span>
            of
            <span className="font-medium mx-1">{total}</span>
            results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <Link
              as="a"
              href={previous}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            {links.map((link) => (
              <Link
                as="a"
                href={link.url}
                key={link.label}
                aria-current={`${link.active && "page"}`}
                className={` ${
                  link.active ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "border-gray-300 text-gray-500 hover:bg-gray-50"
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={next}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

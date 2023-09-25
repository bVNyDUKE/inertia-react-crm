import { Link } from "@inertiajs/react";

const CrumbsLink = ({ routeName, backLink, pageName }) => (
  <>
    <Link className="text-indigo-400 hover:text-indigo-600" href={route(routeName)}>
      {backLink} <span className="font-normal">/</span>
    </Link>
    <span> {pageName}</span>
  </>
);

export default CrumbsLink;

import React from "react";

function HeaderCell({ data }) {
  return <th className="p-2 pb-3 bg-gray-800 text-white font-bold text-left table-cell">{data}</th>;
}

function Head({ headers }) {
  return (
    <thead>
      <tr className="border border-gray-800 table-row uppercase">
        {headers.map((header, index) => (
          <HeaderCell key={index + header} data={header} />
        ))}
      </tr>
    </thead>
  );
}

function Body(props) {
  return <tbody className="table-row-group">{props.children}</tbody>;
}

function Row(props) {
  return <tr className={`border-b border-t border-gray-300 odd:bg-white even:bg-gray-100`}>{props.children}</tr>;
}

function Cell({ data, children, className = "" }) {
  return (
    <td className={`py-2 pl-2 text-gray-600 ${className}`}>
      {data}
      {children}
    </td>
  );
}

function Main(props) {
  return (
    <>
      <div className="p-3 mb-3 border-b border-gray-300">{props.title}</div>
      <div className="mx-2 mt-4 mb-2 p-2">
        <table className="table table-auto w-full border-collapse text-sm">{props.children}</table>
      </div>
    </>
  );
}

const Table = {
  Main,
  Head,
  Body,
  Row,
  Cell,
};

export default Table;

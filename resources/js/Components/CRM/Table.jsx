import React from "react";

function HeaderCell({ data }) {
  return <th className="px-6 pt-6 pb-4">{data}</th>;
}

function Head({ headers }) {
  return (
    <tr className="text-left font-bold">
      {headers.map((header, index) => (
        <HeaderCell key={index + header} data={header} />
      ))}
    </tr>
  );
}

function Body(props) {
  return <tbody className="table-row-group">{props.children}</tbody>;
}

function Row(props) {
  return <tr className="focus-within:bg-gray-100 hover:bg-gray-100">{props.children}</tr>;
}

function Cell({ data, children, className = "" }) {
  return (
    <td className={`border-t ${className}`}>
      {data}
      {children}
    </td>
  );
}

function Main(props) {
  return (
    <>
      <table className="w-full whitespace-nowrap">{props.children}</table>
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

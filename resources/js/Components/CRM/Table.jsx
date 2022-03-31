import React from "react";
import Pagination from "./Pagination";

function Th({ className, children }) {
  return <th className={`px-6 pt-6 pb-4 ${className}`}>{children}</th>;
}

function Head(props) {
  return (
    <thead>
      <tr className="text-left font-bold">{props.children}</tr>
    </thead>
  );
}

function Body(props) {
  return <tbody className="table-row-group">{props.children}</tbody>;
}

function Row(props) {
  return <tr className="focus-within:bg-gray-100 hover:bg-gray-100">{props.children}</tr>;
}

function Cell({ children, className = "" }) {
  return <td className={`border-t ${className}`}>{children}</td>;
}

function Main(props) {
  return (
    <>
      <div className="overflow-x-auto rounded-md bg-white shadow">
        <table className="w-full whitespace-nowrap">{props.children}</table>
      </div>
      {props.paginator && <Pagination paginator={props.paginator} />}
    </>
  );
}

const Table = {
  Main,
  Head,
  Body,
  Row,
  Cell,
  Th,
};

export default Table;

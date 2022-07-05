export default function Button({ color = "blue", label, onClick = null }) {
  const colorClass = color === "red" ? "bg-red-500 hover:bg-red-700 border-red-500" : "bg-blue-500 hover:bg-blue-700 border-blue-500";

  return (
    <button onClick={onClick} className={`rounded border py-2 px-3 font-bold text-white ${colorClass}`}>
      {label}
    </button>
  );
}

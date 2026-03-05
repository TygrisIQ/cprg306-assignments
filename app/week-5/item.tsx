import React from "react";

type ItemProps = {
  name: string;
  quantity: number;
  category: string;
  onSelect?: () => void; // optional so week-5/page.tsx still works
};

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={onSelect}
      className={`p-2 m-4 bg-slate-900 max-w-sm rounded-md shadow-sm transition-colors ${
        onSelect ? "hover:bg-orange-800 cursor-pointer" : ""
      }`}
    >
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <div className="text-sm text-gray-300">
        Buy {quantity} in {category}
      </div>
    </li>
  );
}